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
    public class RewardController : ControllerBase
    {
        private readonly IRewardService _service;

        public RewardController(IRewardService service)
        {
            _service = service;
        }
        [HttpPost]
        public async Task<ActionResult<ActivityDto>> Post([FromBody] RewardDto rewardDto)
        {
            await _service.Create(rewardDto);
            return CreatedAtAction(nameof(GetItemById), new { id = rewardDto.Id });
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<RewardDto>>> GetAllByFilter([FromQuery] string filter)
        {
            return Accepted(await _service.GetCollection(filter));
        }

        [HttpGet]
        public async Task<ActionResult<RewardDto>>GetItemById([FromQuery] int id)
        {
            return Ok(await _service.GetItem(id));
        }

        [HttpPut]
        public async Task<IActionResult> Put([FromQuery] RewardDto rewardDto)
        {
            await _service.Update(rewardDto);
            return Accepted();
        }

        [HttpDelete]
        public async Task<IActionResult> Delete([FromQuery] int id)
        {
            await _service.Delete(id);
            return NoContent();
        }

    }
}