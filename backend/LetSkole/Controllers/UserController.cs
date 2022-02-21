using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using LetSkole.Dto;
using LetSkole.Entities.Indentity;
using LetSkole.Services;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;

namespace LetSkole.Controllers
{
    // [ApiController]
    // [Route("api/v2/[controller]/[action]")]
    // [Produces("application/json")]
    [Authorize(AuthenticationSchemes =
        Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme)]
    public class UserController : LetSkoleController
    {
        private readonly IUserService _service;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IMapper _mapper;

        public UserController(IUserService service, UserManager<ApplicationUser> userManager, IMapper mapper)
        {
            _service = service;
            _userManager = userManager;
            _mapper = mapper;
        }

        [HttpGet]
        [ProducesResponseType(typeof(LetSkoleResponse<AppUserProfileDto>), 200)]
        [ProducesResponseType(typeof(LetSkoleResponse), 404)]
        public async Task<ActionResult> GetItemById([FromQuery] string id)
        {
            var appUser = await _userManager.FindByIdAsync(id);
            if (appUser == null)
                return NotFound(LetSkoleResponse
                    .Error("Not Found: 'id' doesn't exist", 404)
                );

            var userResource = _mapper.Map<ApplicationUser, AppUserProfileDto>(appUser);
            return Ok(LetSkoleResponse<AppUserProfileDto>.Success(userResource));
        }

        [HttpPut]
        [ProducesResponseType(typeof(LetSkoleResponse<AppUserProfileDto>), 200)]
        [ProducesResponseType(typeof(LetSkoleResponse), 404)]
        public async Task<IActionResult> Put([FromBody] AppUserProfileDto model)
        {
            var appUser = await _userManager.FindByIdAsync(model.Id);
            if (appUser == null)
                return NotFound(LetSkoleResponse
                    .Error("Not Found: 'id' doesn't exist", 404)
                );

            appUser.DisplayedName = model.DisplayedName;
            appUser.School = model.School;
            appUser.PhoneNumber = model.PhoneNumber;
            appUser.Birthday = model.Birthday;

            await _userManager.UpdateAsync(appUser);
            var userResource = _mapper.Map<ApplicationUser, AppUserProfileDto>(appUser);
            return Ok(
                LetSkoleResponse<AppUserProfileDto>.Success(userResource)
            );
        }

        [HttpDelete]
        public async Task<IActionResult> Delete([FromQuery] string id)
        {
            try
            {
                await _service.Delete(id);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }

            return Accepted();
        }

        [HttpGet]
        public async Task<ActionResult<string>> SearchNumTel([FromQuery] string userId)
        {
            string str;
            try
            {
                str = await _service.SearchNumTel(userId);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }

            return Accepted(str);
        }
    }
}