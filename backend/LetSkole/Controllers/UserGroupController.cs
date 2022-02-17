using LetSkole.Dto;
using LetSkole.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LetSkole.Controllers
{
    [ApiController]
    [Route("api/v2/[controller]/[action]")]
    public class UserGroupController : ControllerBase
    {
        private readonly IUserGroupService _service;

        public UserGroupController(IUserGroupService service)
        {
            _service = service;
        }

        [HttpPost]
        public async Task<ActionResult<UserGroupDto>> Post([FromBody] UserGroupDto userGroupDto)
        {
            try
            {
                await _service.Create(userGroupDto);
            }
            catch(LetSkoleException e)
            {
                return BadRequest(e.Message + " " + e.value);
            }

            return CreatedAtAction(nameof(GetItemById), new { userId = userGroupDto.UserId, groupId = userGroupDto.GroupId }, userGroupDto);
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserGroupDto>>> GetItemById ([FromQuery] int groupId)
        {

            return Accepted(await _service.GetItems(groupId));
        }

        
        [HttpDelete]
        public async Task<IActionResult> DeleteUsingGroup([FromQuery] int groupId)
        {
            try
            {
               await _service.DeleteUsingGroup(groupId);
            } catch(Exception e)
            {
                return NotFound(e.Message);
            }
            return NoContent();
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteUsingUser([FromQuery] string userId, int groupId)
        {
            try
            {
                await _service.DeleteUsingUser(userId,groupId);
            } catch (Exception e)
            {
                return NotFound(e.Message);
            }

            return NoContent();
        }

        [HttpPut]
        public async Task<IActionResult> Put([FromBody] UserGroupDto userGroupDto)
        {
            try
            {
                await _service.Update(userGroupDto);
            } catch(NullReferenceException e)
            {
                return NotFound(e.Message);
            }
            return NoContent();
        }
        [HttpGet]
        public async Task<ActionResult<int>> GetByUserID ([FromQuery] string userId)
        {
            //Int32 grade;
            return Accepted(await _service.SearchGrade(userId));
            //try
            //{
            //    grade = await _service.SearchGrade(userId);
            //} catch(Exception e)
            //{
            //    return NotFound(e.Message);
            //}
            //return Accepted(grade);

        }
    }
}
