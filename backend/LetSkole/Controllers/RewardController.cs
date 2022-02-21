using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using LetSkole.Dto;
using LetSkole.Services;
using Microsoft.AspNetCore.Authorization;

namespace LetSkole.Controllers
{
    [Authorize(AuthenticationSchemes =
        Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme)]
    public class RewardController : LetSkoleController
    {
        private readonly IRewardService _service;

        public RewardController(IRewardService service)
        {
            _service = service;
        }
        
        // [HttpPost]
        // public async Task<ActionResult<RewardUserDto>> PostRewardxUser([FromBody] RewardUserDto model)
        // {
        //     try
        //     {
        //         await _service.CreateRewardxUser(model);
        //     }
        //     catch (Exception e)
        //     {
        //         return BadRequest(e.Message);
        //     }
        //
        //     return CreatedAtAction(nameof(GetItemById),
        //         new {userId = model.UserId, rewardId = model.RewardId}, model);
        // }

        // [HttpGet]
        // public async Task<ActionResult<IEnumerable<RewardDto>>> GetAllByFilter([FromQuery] string filter)
        // {
        //     return Accepted(await _service.GetCollection(filter));
        // }

        // public async Task<ActionResult<IEnumerable<RewardDto>>> GetAllByUserId([FromQuery] string userId)
        
        [HttpGet]
        [ProducesResponseType(typeof(LetSkoleResponse<IEnumerable<RewardDto>>), 200)]
        public async Task<ActionResult> GetAllByUserId([FromQuery] string userId)
        {
            var response = await _service.GetEnumerableByUserId(userId);
            return Ok(LetSkoleResponse<IEnumerable<RewardDto>>.Success(response));
        }

        [HttpGet]
        [ProducesResponseType(typeof(LetSkoleResponse<IEnumerable<RewardDto>>), 200)]
        public async Task<ActionResult> GetAllByGameId([FromQuery] int gameId)
        {
            var response = await _service.GetEnumerableByGameId(gameId);
            return Ok(LetSkoleResponse<IEnumerable<RewardDto>>.Success(response));
        }
        
        [HttpGet]
        public async Task<ActionResult<RewardDto>> GetItemById([FromQuery] int id)
        {
            try
            {
                return Ok(await _service.GetItem(id));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }


        [HttpDelete]
        public async Task<IActionResult> Delete([FromQuery] int userId,int rewardId)
        {
            try
            {
                await _service.Delete(userId, rewardId);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }

            return NoContent();
        }
    }
}