using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using LetSkole.Dto;
using LetSkole.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;

namespace LetSkole.Controllers
{
    [Authorize(Roles = "Student")]
    public class RewardUserController : LetSkoleController
    {
        private readonly IRewardUserService _service;

        public RewardUserController(IRewardUserService service)
        {
            _service = service;
        }

        [HttpPost]
        [ProducesResponseType(typeof(LetSkoleResponse<RxuResponse>), 200)]
        [ProducesResponseType(typeof(LetSkoleResponse), 400)]
        [ProducesResponseType(typeof(LetSkoleResponse), 403)]
        [ProducesResponseType(typeof(LetSkoleResponse), 404)]
        public async Task<ActionResult> Post([FromQuery] int rewardId)
        {
            var response = new RxuResponse();
            try
            {
                var userId = await GetJwtPayloadData("AppUserId");
                response = await _service.Create(userId, rewardId);
            }
            catch (LetSkoleException e)
            {
                switch (e.Code)
                {
                    case 400:
                        return BadRequest(
                            LetSkoleResponse.Error(e.Message, e.Code));
                    case 403:
                        return StatusCode(StatusCodes.Status403Forbidden,
                            LetSkoleResponse.Error("Forbidden", e.Code));
                    case 404:
                        return NotFound(
                            LetSkoleResponse.Error("Not Found: " + e.Message, e.Code));
                }
            }

            return Ok(LetSkoleResponse<RxuResponse>.Success(response));
        }

        [HttpDelete]
        [ProducesResponseType(typeof(LetSkoleResponse), 200)]
        [ProducesResponseType(typeof(LetSkoleResponse), 403)]
        [ProducesResponseType(typeof(LetSkoleResponse), 404)]
        public async Task<IActionResult> Delete([FromQuery] int rewardId)
        {
            try
            {
                var userId = await GetJwtPayloadData("AppUserId");
                await _service.Delete(userId, rewardId);
            }
            catch (LetSkoleException e)
            {
                switch (e.Code)
                {
                    case 403:
                        return StatusCode(StatusCodes.Status403Forbidden,
                            LetSkoleResponse.Error("Forbidden", e.Code));
                    case 404:
                        return NotFound(
                            LetSkoleResponse.Error("Not Found", e.Code));
                }
            }

            return Ok(LetSkoleResponse.Success("Ok: RewardUser has been deleted"));
        }

        [HttpGet]
        [ProducesResponseType(typeof(LetSkoleResponse<IEnumerable<RxuResponse>>), 200)]
        public async Task<ActionResult> GetAllByGameId([FromQuery] int gameId)
        {
            var userId = await GetJwtPayloadData("AppUserId");
            var response = await _service
                .GetEnumerableByGameId(userId, gameId);
            return Ok(LetSkoleResponse<IEnumerable<RxuResponse>>.Success(response));
        }
    }
}