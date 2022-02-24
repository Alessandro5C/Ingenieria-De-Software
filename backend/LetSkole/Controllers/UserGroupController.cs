using LetSkole.Dto;
using LetSkole.Services;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;

namespace LetSkole.Controllers
{
    public class UserGroupController : LetSkoleController
    {
        private readonly IUserGroupService _service;

        public UserGroupController(IUserGroupService service)
        {
            _service = service;
        }

        [HttpPost]
        [Authorize(Roles = "Teacher")]
        [ProducesResponseType(typeof(LetSkoleResponse<UxgResponse>), 200)]
        [ProducesResponseType(typeof(LetSkoleResponse), 400)]
        [ProducesResponseType(typeof(LetSkoleResponse), 403)]
        [ProducesResponseType(typeof(LetSkoleResponse), 404)]
        public async Task<ActionResult> Post([FromBody] UxgRequestForPost model)
        {
            var response = new UxgResponse();
            try
            {
                var ownerId = await GetJwtPayloadData("AppUserId");
                response = await _service.Create(ownerId, model);
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

            return Ok(LetSkoleResponse<UxgResponse>.Success(response));
        }

        [HttpPut]
        [Authorize(Roles = "Teacher")]
        [ProducesResponseType(typeof(LetSkoleResponse), 200)]
        [ProducesResponseType(typeof(LetSkoleResponse), 400)]
        [ProducesResponseType(typeof(LetSkoleResponse), 403)]
        [ProducesResponseType(typeof(LetSkoleResponse), 404)]
        public async Task<IActionResult> Put([FromBody] UxgRequestForPut model)
        {
            try
            {
                var ownerId = await GetJwtPayloadData("AppUserId");
                await _service.Update(ownerId, model);
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

            return Ok(LetSkoleResponse.Success("Ok: Group has been updated"));
        }

        [HttpDelete]
        [Authorize(Roles = "Teacher")]
        [ProducesResponseType(typeof(LetSkoleResponse), 200)]
        [ProducesResponseType(typeof(LetSkoleResponse), 403)]
        [ProducesResponseType(typeof(LetSkoleResponse), 404)]
        public async Task<IActionResult> Delete([FromQuery] string userId, int groupId)
        {
            try
            {
                var ownerId = await GetJwtPayloadData("AppUserId");
                await _service.Delete(ownerId, userId, groupId);
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
                            LetSkoleResponse.Error("Not Found: " + e.Message, e.Code));
                }
            }

            return Ok(LetSkoleResponse.Success("Ok: Group has been deleted"));
        }

        [HttpGet]
        [Authorize(Roles = "Student,Teacher")]
        [ProducesResponseType(typeof(LetSkoleResponse<IEnumerable<UxgResponse>>), 200)]
        public async Task<ActionResult> GetAllByGroupId([FromQuery] int groupId)
        {
            var response = await _service.GetEnumerableByGroupId(groupId);
            return Ok(LetSkoleResponse<IEnumerable<UxgResponse>>.Success(response));
        }
    }
}