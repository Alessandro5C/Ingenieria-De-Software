using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using LetSkole.Dto;
using LetSkole.Services;
using Microsoft.AspNetCore.Authorization;

namespace LetSkole.Controllers
{
    public class GameController : LetSkoleController
    {
        private readonly IGameService _service;

        public GameController(IGameService service)
        {
            _service = service;
        }

        [HttpGet]
        [Authorize(Roles = "Student")]
        [ProducesResponseType(typeof(LetSkoleResponse<IEnumerable<GameResponse>>), 200)]
        public async Task<ActionResult> GetAll()
        {
            var response = await _service.GetEnumerable();
            return Ok(LetSkoleResponse<IEnumerable<GameResponse>>.Success(response));
        }
    }
}