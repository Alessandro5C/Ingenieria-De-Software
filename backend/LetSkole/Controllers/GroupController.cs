using LetSkole.Dto;
using LetSkole.Services;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;

namespace LetSkole.Controllers
{
    public class GroupController : LetSkoleController
    {
        private readonly IGroupService _service;

        public GroupController(IGroupService service)
        {
            _service = service;
        }

        [HttpPost]
        [Authorize(Roles = "Teacher")]
        [ProducesResponseType(typeof(LetSkoleResponse<GroupResponse>), 200)]
        [ProducesResponseType(typeof(LetSkoleResponse), 400)]
        public async Task<ActionResult> Post([FromBody] GroupRequestForPost model)
        {
            var response = new GroupResponse();
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
                }
            }

            return Ok(LetSkoleResponse<GroupResponse>.Success(response));
        }

        [HttpPut]
        [ProducesResponseType(typeof(LetSkoleResponse), 200)]
        [ProducesResponseType(typeof(LetSkoleResponse), 400)]
        [ProducesResponseType(typeof(LetSkoleResponse), 403)]
        [ProducesResponseType(typeof(LetSkoleResponse), 404)]
        public async Task<IActionResult> Put([FromBody] GroupRequestForPut model, [FromQuery] int id)
        {
            try
            {
                var ownerId = await GetJwtPayloadData("AppUserId");
                await _service.Update(ownerId, model, id);
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

            return Ok(LetSkoleResponse
                .Success("Ok: Group has been updated"));
        }

        [HttpDelete]
        [ProducesResponseType(typeof(LetSkoleResponse), 200)]
        [ProducesResponseType(typeof(LetSkoleResponse), 403)]
        [ProducesResponseType(typeof(LetSkoleResponse), 404)]
        public async Task<IActionResult> Delete([FromQuery] int id)
        {
            try
            {
                var ownerId = await GetJwtPayloadData("AppUserId");
                await _service.Delete(ownerId, id);
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

            return Ok(LetSkoleResponse
                .Success("Ok: Group has been deleted"));
        }

        [HttpGet]
        [ProducesResponseType(typeof(LetSkoleResponse<IEnumerable<GroupResponse>>), 200)]
        public async Task<ActionResult> GetAllAsUser()
        {
            var userId = await GetJwtPayloadData("AppUserId");
            var response = await _service.GetEnumerableByUserId(userId);
            return Ok(LetSkoleResponse<IEnumerable<GroupResponse>>.Success(response));
        }

        [HttpGet]
        [Authorize(Roles = "Teacher")]
        [ProducesResponseType(typeof(LetSkoleResponse<IEnumerable<GroupResponse>>), 200)]
        public async Task<ActionResult> GetAllAsOwner()
        {
            var ownerId = await GetJwtPayloadData("AppUserId");
            var response = await _service.GetEnumerableByOwnerId(ownerId);
            return Ok(LetSkoleResponse<IEnumerable<GroupResponse>>.Success(response));
        }
    }
}