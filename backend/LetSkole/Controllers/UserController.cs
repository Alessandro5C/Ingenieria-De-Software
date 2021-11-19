using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using LetSkole.Dto;
using LetSkole.Services;

namespace LetSkole.Controllers
{
    [Route("api/v1/[controller]/[action]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _service;
            
        public UserController(IUserService service)
        {
            _service = service;
        }

        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<UserDto>), 200)]
        public async Task<ActionResult> GetAllByFilter([FromQuery] string filter)
        {
            return Ok(await _service.GetCollection(filter));
        }
        
        [HttpGet]
        public async Task<ActionResult<UserDto>> GetItemById ([FromQuery] int id)
        {
            UserDto userDto;
            try
            {
                userDto =  await _service.GetItem(id);
            }
            catch(NullReferenceException e)
            {
                return NotFound(e.Message);
            }
            catch (LetSkoleException e)
            {
                return BadRequest(e.Message + " " + e.value);
            }
            return Ok(userDto);
        }

        [HttpPut]
        public async Task<IActionResult> Put ([FromBody] UserDto userDto)
        {
            try
            {
                await _service.Update(userDto);
            }
            catch ( Exception e)
            {
                return BadRequest(e.Message);
            }
            return Accepted();
        }

        [HttpDelete]
        public async Task<IActionResult> Delete ([FromQuery] int id)
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
        public async Task<ActionResult<string>> SearchNumTel ([FromQuery] int userId)
        {
            string str;
            try {
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
