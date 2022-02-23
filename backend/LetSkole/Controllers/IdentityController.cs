using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net.Mail;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using LetSkole.Dto;
using LetSkole.Entities;
using LetSkole.Entities.Indentity;
using LetSkole.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace LetSkole.Controllers
{
    [AllowAnonymous]
    public class IdentityController : LetSkoleController
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly IConfiguration _configuration;
        private readonly IUserService _userService;
        private readonly IMapper _mapper;

        public IdentityController(
            UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInManager,
            IConfiguration configuration,
            IUserService userService,
            IMapper mapper
        )
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _configuration = configuration;
            _userService = userService;
            _mapper = mapper;
        }

        [HttpPost]
        [ProducesResponseType(typeof(LetSkoleResponse<AppIdentityResponseDto>), 200)]
        public async Task<IActionResult> SignIn(AppIdentityRequestDto model)
        {
            var appIdentity = new AppIdentityResponseDto();
            var appUser = await _userManager.FindByEmailAsync(model.Email);
            if (appUser == null)
                return Ok(
                    LetSkoleResponse<AppIdentityResponseDto>.Success(appIdentity)
                );
            var check = await _signInManager
                .CheckPasswordSignInAsync(appUser, model.Password, false);
            if (!check.Succeeded)
                return Ok(
                    LetSkoleResponse<AppIdentityResponseDto>.Success(appIdentity)
                );

            var token = await GenerateToken(appUser);
            appIdentity = new AppIdentityResponseDto
            {
                Id = appUser.Id, Token = token, Valid = true
            };

            return Ok(
                LetSkoleResponse<AppIdentityResponseDto>.Success(appIdentity)
            );
        }

        // NOTE: Below here are defined **private** methods

        [NonAction]
        private async Task<string> GenerateToken(ApplicationUser applicationUser)
        {
            var secretKey = _configuration.GetValue<string>("SecretKey");
            var key = Encoding.ASCII.GetBytes(secretKey);

            var claims = new List<Claim>
            {
                new("AppUserId", applicationUser.Id),
            };

            var roles = await _userManager.GetRolesAsync(applicationUser);

            claims.AddRange(roles.Select(role => new Claim(ClaimTypes.Role, role)));

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddMinutes(120),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key),
                    SecurityAlgorithms.HmacSha256Signature)
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var createdToken = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(createdToken);
        }

        [NonAction]
        private static string UniqueUserName(string displayedName)
        {
            return displayedName + "#" +
                   DateTime.UtcNow.Ticks + "#" +
                   Guid.NewGuid();
        }
    }
}