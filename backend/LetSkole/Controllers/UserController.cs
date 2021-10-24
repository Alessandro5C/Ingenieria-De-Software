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
        [HttpPost]
        public async Task<ActionResult<UserDto>> Post([FromBody] UserDto userDto)
        {
            try
            {
                _service.Create(userDto);
            }
            catch( LetSkoleException e)
            {
                return BadRequest(e.Message + " " + e.value);
            }

            return CreatedAtAction(nameof(GetItemById), new { id = userDto.Id });
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserDto>>> GetAllByFilter([FromQuery] string filter)
        {
            return Accepted(_service.GetCollection(filter));
        }
        
        [HttpGet]
        public async Task<ActionResult<UserDto>> GetItemById ([FromQuery] int id)
        {
            UserDto userDto;
            try
            {
                userDto =  _service.GetItem(id);
            }
            catch(NullReferenceException e)
            {
                return NotFound(e.Message);
            }
            catch (LetSkoleException e)
            {
                return BadRequest(e.Message + " " + e.value);
            }
            return userDto;
        }

        [HttpPut]
        public void Put ([FromQuery] UserDto userDto)
        {
            _service.Update(userDto);
        }

        [HttpDelete]
        public void Delete ([FromQuery] int id)
        {
           
            _service.Delete(id);
        }
        [HttpGet]
        public string SearchNumTel([FromQuery] int userId)
        {
            return _service.SearchNumTel(userId);
        }

    }
}
