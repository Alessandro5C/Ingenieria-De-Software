using System.Collections.Generic;
using System.Threading.Tasks;
using LetSkole.Dto;
using LetSkole.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace LetSkole.Controllers
{
    public class ActivityController : LetSkoleController
    {
        private readonly IActivityService _service;

        public ActivityController(IActivityService service)
        {
            _service = service;
        }

        [HttpPost]
        [ProducesResponseType(typeof(LetSkoleResponse<ActivityResponse>), 200)]
        [ProducesResponseType(typeof(LetSkoleResponse), 400)]
        public async Task<ActionResult> Post([FromBody] ActivityRequestForPost model)
        {
            var response = new ActivityResponse();
            try
            {
                var userId = await GetJwtPayloadData("AppUserId");
                response = await _service.Create(userId, model);
            }
            catch (LetSkoleException e)
            {
                switch (e.Code)
                {
                    case 400:
                        return BadRequest(
                            LetSkoleResponse.Error(e.Message, e.Code));
                }
            }

            return Ok(LetSkoleResponse<ActivityResponse>.Success(response));
        }

        [HttpPut]
        [ProducesResponseType(typeof(LetSkoleResponse), 200)]
        [ProducesResponseType(typeof(LetSkoleResponse), 400)]
        [ProducesResponseType(typeof(LetSkoleResponse), 403)]
        [ProducesResponseType(typeof(LetSkoleResponse), 404)]
        public async Task<IActionResult> Put([FromBody] ActivityRequestForPut model, [FromQuery] int id)
        {
            try
            {
                var userId = await GetJwtPayloadData("AppUserId");
                await _service.Update(userId, model, id);
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
                            LetSkoleResponse.Error("Not Found", e.Code));
                }
            }

            return Ok(LetSkoleResponse.Success("Ok: Activity has been updated"));
        }

        [HttpDelete]
        [ProducesResponseType(typeof(LetSkoleResponse), 200)]
        [ProducesResponseType(typeof(LetSkoleResponse), 403)]
        [ProducesResponseType(typeof(LetSkoleResponse), 404)]
        public async Task<IActionResult> Delete([FromQuery] int id)
        {
            try
            {
                var userId = await GetJwtPayloadData("AppUserId");
                await _service.Delete(userId, id);
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

            return Ok(LetSkoleResponse.Success("Ok: Activity has been deleted"));
        }
        
        [HttpGet]
        [ProducesResponseType(typeof(LetSkoleResponse<IEnumerable<ActivityResponse>>), 200)]
        public async Task<ActionResult> GetAllAsOwner()
        {
            var userId = await GetJwtPayloadData("AppUserId");
            var response = await _service.GetEnumerableByUserId(userId);
            return Ok(LetSkoleResponse<IEnumerable<ActivityResponse>>.Success(response));
        }
    }
}