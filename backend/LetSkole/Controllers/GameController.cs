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
        public IEnumerable<GameDto> GetAllByFilter([FromQuery] string filter)
        {
            return _service.GetCollection(filter);
        }

        [HttpGet]
        public GameDto GetItemById([FromQuery] int id)
        {
            return _service.GetItem(id);
        }

    }
}