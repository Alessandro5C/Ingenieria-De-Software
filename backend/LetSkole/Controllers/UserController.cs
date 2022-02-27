using System;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using LetSkole.Dto;
using LetSkole.Entities.Indentity;
using LetSkole.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;

namespace LetSkole.Controllers
{
    public class UserController : LetSkoleController
    {
        private readonly IUserService _service;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly IConfiguration _configuration;

        public UserController(IUserService service, SignInManager<ApplicationUser> signInManager,
            IConfiguration configuration)
        {
            _service = service;
            _signInManager = signInManager;
            _configuration = configuration;
        }

        [HttpPost]
        [AllowAnonymous]
        [ProducesResponseType(typeof(LetSkoleResponse<AppIdentityResponse>), 200)]
        public async Task<IActionResult> SignIn(AppIdentityRequest model)
        {
            var secretKey = _configuration.GetValue<string>("SecretKey") ??
                            Environment.GetEnvironmentVariable("HerokuSecretKey");
            var response = await _service.IdentitySignIn(
                model, _signInManager.CheckPasswordSignInAsync, secretKey);
            return Ok(LetSkoleResponse<AppIdentityResponse>.Success(response));
        }

        [HttpPost]
        [AllowAnonymous]
        [ProducesResponseType(typeof(LetSkoleResponse<AppUserResponse>), 200)]
        [ProducesResponseType(typeof(LetSkoleResponse), 400)]
        public async Task<IActionResult> SignUp(AppUserRequestForPost model)
        {
            var response = new AppUserResponse();
            try
            {
                response = await _service.Create(model);
            }
            catch (LetSkoleException e)
            {
                switch (e.Code)
                {
                    case 400:
                        return BadRequest(
                            LetSkoleResponse.Error(e.Message, e.Code));
                }
            }

            return Ok(LetSkoleResponse<AppUserResponse>.Success(response));
        }

        [HttpGet]
        [ProducesResponseType(typeof(LetSkoleResponse<AppUserResponse>), 200)]
        [ProducesResponseType(typeof(LetSkoleResponse), 404)]
        public async Task<ActionResult> GetItemById([FromQuery] string id)
        {
            var response = new AppUserResponse();
            try
            {
                response = await _service.GetItemById(id);
            }
            catch (LetSkoleException e)
            {
                switch (e.Code)
                {
                    case 404:
                        return NotFound(
                            LetSkoleResponse.Error("Not Found: User doesn't exist", e.Code));
                }
            }

            return Ok(LetSkoleResponse<AppUserResponse>.Success(response));
        }

        [HttpPut]
        [ProducesResponseType(typeof(LetSkoleResponse), 200)]
        [ProducesResponseType(typeof(LetSkoleResponse), 404)]
        public async Task<IActionResult> Put([FromBody] AppUserRequestForPut model)
        {
            try
            {
                var id = await GetJwtPayloadData("AppUserId");
                await _service.Update(id, model);
            }
            catch (LetSkoleException e)
            {
                switch (e.Code)
                {
                    case 400:
                        return BadRequest(
                            LetSkoleResponse.Error(e.Message, e.Code));
                    case 404:
                        return NotFound(
                            LetSkoleResponse.Error("Not Found: User doesn't exist", e.Code));
                }
            }

            return Ok(LetSkoleResponse.Success("Ok: User has been updated"));
        }
    }
}