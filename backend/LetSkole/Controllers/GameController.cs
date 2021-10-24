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
    public class GameController : ControllerBase
    {
        private readonly IGameService _service;

        public GameController(IGameService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<GameDto>>> GetAllByFilter([FromQuery] string filter)
        {
            return Accepted(await _service.GetCollection(filter));
        }

        [HttpGet]
        public async Task<ActionResult<GameDto>> GetItemById([FromQuery] int id)
        {
            try
            {
                return Accepted(await _service.GetItem(id));
            } catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

    }
}