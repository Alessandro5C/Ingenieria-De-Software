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
    [Route("api/v1/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _service;

        public UserController(IUserService service)
        {
            _service = service;
        }

        [HttpPost]
        public void Post([FromBody] UserDto userDto)
        {
            _service.Create(userDto);
        }
        
        [HttpGet]
        public IEnumerable<UserDto> GetAllByFilter([FromQuery] string filter)
        {
            return _service.GetCollection(filter);
        }
        
    }
}
