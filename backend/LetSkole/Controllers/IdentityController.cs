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
    // [Route("api/v2/[controller]/[action]")]
    // [Produces("application/json")]
    [AllowAnonymous]
    public class IdentityController : LetSkoleController
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private SignInManager<ApplicationUser> _signInManager;
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

        // [AllowAnonymous]
        // [HttpPost("sign-up")]
//         public async Task<IActionResult> SignUp(ApplicationUserLoginDto model)
//         {
//             var result = await _userManager.CreateAsync(new ApplicationUser
//             {
//                 Email = model.Email,
//                 UserName = model.Email,
//             }, model.Password);
//            if (!result.Succeeded)
//                throw new Exception("No se pudo crear el 'Application User'" + result.ToString());
//            return Ok();
//         }
//         
//         [AllowAnonymous]
//         [HttpPost("NewUser")]
//         [ProducesResponseType(typeof(UserDto), 200)]
//         [ProducesResponseType(typeof(BadRequestResult), 404)]
//         public async Task<IActionResult> CreateUser([FromBody] UserDto userDto)
// =======

        // [AllowAnonymous]
        // [HttpPost("sign-up")]
        [HttpPost]
        [ProducesResponseType(typeof(LetSkoleResponse<AppUserResponse>), 200)]
        [ProducesResponseType(typeof(LetSkoleResponse), 400)]
        public async Task<IActionResult> SignUp(AppUserRequestForPost model)
        {
            // Service validation
            if (string.IsNullOrEmpty(model.DisplayedName))
                return BadRequest(LetSkoleResponse.Error(
                    "Bad Request: 'name' is empty", 400)
                );

            // Generate and entity to pass to Repository
            var appUser = new ApplicationUser
            {
                Email = model.Email,
                DisplayedName = model.DisplayedName,
                UserName = UniqueUserName(model.DisplayedName),
                Student = model.Student
            };

            // repository created
            var result = await _userManager.CreateAsync(appUser, model.Password);
            if (!result.Succeeded)
                return BadRequest(LetSkoleResponse.Error(
                    "Bad Request: " + result, 400)
                );

            var userResource = _mapper.Map<ApplicationUser, AppUserResponse>(appUser);
            return Ok(userResource);
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

        private async Task<string> GenerateToken(ApplicationUser applicationUser)
        {
            var secretKey = _configuration.GetValue<string>("SecretKey");
            var key = Encoding.ASCII.GetBytes(secretKey);

            var claims = new List<Claim>()
            {
                new Claim("AppUserId", applicationUser.Id),
                // new Claim(ClaimTypes.Sid, applicationUser.Id),
                // new Claim(ClaimTypes.Email, applicationUser.Email),
                // new Claim(ClaimTypes.Role, applicationUser.Student.ToString()),
            };

            var roles = await _userManager.GetRolesAsync(applicationUser);

            claims.AddRange(roles.Select(role => new Claim(ClaimTypes.Role, role)));

            var tokenDescriptor = new SecurityTokenDescriptor()
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddDays(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key),
                    SecurityAlgorithms.HmacSha256Signature)
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var createdToken = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(createdToken);
        }

        private static string UniqueUserName(string displayedName)
        {
            return displayedName + "#" +
                   DateTime.UtcNow.Ticks + "#" +
                   Guid.NewGuid();
        }
    }
}