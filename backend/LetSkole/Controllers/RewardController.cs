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
        public async Task<ActionResult<RewardUserDto>> PostRewardxUser([FromBody] RewardUserDto rewardUser)
        {
            try
            {
                await _service.CreateRewardxUser(rewardUser);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
            return CreatedAtAction(nameof(GetItemById), new { userId = rewardUser.UserId, rewardId = rewardUser.RewardId}, rewardUser);

        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<RewardDto>>> GetAllByFilter([FromQuery] string filter)
        {
            return Accepted(await _service.GetCollection(filter));
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<RewardDto>>> GetAllByFilterRewardsUser([FromQuery] int userId)
        {
            return Accepted(await _service.GetCollectionRewardUser(userId));
        }

        [HttpGet]
        public async Task<ActionResult<RewardDto>>GetItemById([FromQuery] int id)
        {
            try
            {
                return Ok(await _service.GetItem(id));
            } catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }


        [HttpDelete]
        public async Task<IActionResult> Delete([FromQuery] int userId,int rewardId)
        {
            try
            {
                await _service.Delete(userId,rewardId);
            } catch (Exception e)
            {
                return BadRequest(e.Message);
            }
            return NoContent();
        }

    }
}