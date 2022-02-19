using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.IdentityModel.Tokens.Jwt;
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
    [ApiController]
    [Route("api/v2/[controller]")]
    [Produces("application/json")]
    public class IdentityController : ControllerBase
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

        private static string UniqueUserName(string displayedName)
        {
            return displayedName + "#" +
                   DateTime.UtcNow.Ticks + "#" +
                   Guid.NewGuid();
        }

        [AllowAnonymous]
        [HttpPost("sign-up")]
        [ProducesResponseType(typeof(LetSkoleResponse<AppUserProfileDto>), 200)]
        [ProducesResponseType(typeof(LetSkoleResponse), 400)]
        public async Task<IActionResult> Create(AppUserRegisterDto model)
        {
            if (string.IsNullOrEmpty(model.Name))
                return BadRequest(LetSkoleResponse.Error(
                    "Bad Request: 'name' is empty", 400)
                );

            var appUser = new ApplicationUser
            {
                Email = model.Email,
                DisplayedName = model.Name,
                UserName = UniqueUserName(model.Name),
                Student = model.Student
            };

            var result = await _userManager.CreateAsync(appUser, model.Password);
            if (!result.Succeeded)
                return BadRequest( LetSkoleResponse.Error(
                    "Bad Request: " + result, 400)
                );
            var userResource = _mapper.Map<ApplicationUser, AppUserProfileDto>(appUser);
            return Ok(userResource);
        }

        [AllowAnonymous]
        [HttpPost("sign-in")]
        [ProducesResponseType(typeof(LetSkoleResponse<AppIdentityResponseDto>), 200)]
        public async Task<IActionResult> Login(AppIdentityRequestDto model)
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

        private async Task<string> GenerateToken(ApplicationUser applicationUser)
        {
            var secretKey = _configuration.GetValue<string>("SecretKey");
            var key = Encoding.ASCII.GetBytes(secretKey);

            var claims = new List<Claim>()
            {
                new Claim(ClaimTypes.NameIdentifier, applicationUser.Id),
                new Claim(ClaimTypes.Email, applicationUser.Email),
            };

            var roles = await _userManager.GetRolesAsync(applicationUser);

            foreach (var role in roles)
            {
                claims.Add(
                    new Claim(ClaimTypes.Role, role)
                );
            }

            var tokenDescriptor = new SecurityTokenDescriptor()
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
    }
}