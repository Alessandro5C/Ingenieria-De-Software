using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
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
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace LetSkole.Controllers
{
    [ApiController]
    [Route("api/v1/authenticate")]
    public class IdentityController:ControllerBase
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
            _signInManager=signInManager;
            _configuration =configuration;
            _userService=userService;
            _mapper=mapper;
        }
        
        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<IActionResult> Create(ApplicationUserLoginDto model)
        {
            var result = await _userManager.CreateAsync(new ApplicationUser
            {
                Email = model.Email,
                UserName = model.Email,
            }, model.Password);
           if (!result.Succeeded)
               throw new Exception("No se pudo crear el 'Application User'" + result.ToString());
           return Ok();
        }
        
        [AllowAnonymous]
        [HttpPost("NewUser")]
        [ProducesResponseType(typeof(UserDto), 200)]
        [ProducesResponseType(typeof(BadRequestResult), 404)]
        public async Task<IActionResult> CreateUser([FromBody] UserDto userDto)
        {
            var appUser = await _userManager.FindByEmailAsync(userDto.Email);
            if (appUser == null)
            { 
                throw new Exception("No existe un 'Application User' con este correo: " + userDto.Email);
            } 
            
            var user = _mapper.Map<UserDto, User>(userDto);
            user.ApplicationUserId = appUser.Id;
            await _userService.Create(user);
            var usuarioResource = _mapper.Map<User, UserDto>(user);
            
            return Ok(usuarioResource);
        }
        
        [AllowAnonymous]
        [HttpPost("login")]
        [ProducesResponseType(typeof(ApplicationUserResponseDto), 200)]
        public async  Task<IActionResult> Login(ApplicationUserLoginDto model)
        {
            var appUser = await _userManager.FindByEmailAsync(model.Email);
            
            var check= await _signInManager.CheckPasswordSignInAsync(appUser, model.Password,false);
            if (check.Succeeded)
            {
                int userId;
                try
                {
                    userId = await _userService.GetItemByEmail(appUser.Email);
                }
                catch
                {
                    userId = 0;
                }
                var token = await GenerateToken(appUser);

                return Ok(
                    new ApplicationUserResponseDto
                    {
                        UserId = userId,
                        Email = appUser.Email,
                        Token = token
                    }
                );
            }
            return BadRequest("Acceso no válido al sistema");
        }

        private async Task<string> GenerateToken(ApplicationUser user) 
        {
            var secretKey = _configuration.GetValue<string>("SecretKey");
            var key = Encoding.ASCII.GetBytes(secretKey);

            var claims = new List<Claim>()
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id),
                new Claim(ClaimTypes.Email, user.Email),
            };

            var roles = await _userManager.GetRolesAsync(user);

            foreach (var role in roles) 
            {
                claims.Add(
                    new Claim(ClaimTypes.Role, role)
                );
            }

            var tokenDescriptor = new SecurityTokenDescriptor()
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddDays(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var createdToken = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(createdToken);
        }
    }

}