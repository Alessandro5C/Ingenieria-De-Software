using LetSkole.Dto;
using LetSkole.Services;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LetSkole.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class GroupController : Controller
    {
        private readonly IGroupService _service;
        public GroupController(IGroupService service)
        {
            _service = service;
        }

        [Route("Create")]
        [HttpPost]
        public async Task<ActionResult<GroupDto>> Post([FromQuery] int userId, [FromBody] GroupDto GroupDto)
        {
            try
            {
                await _service.Create(userId, GroupDto);
            } catch(LetSkoleException e)
            {
                return BadRequest(e.Message + " " + e.value);
            }
            return CreatedAtAction(nameof(GetItemById), new { id = GroupDto.Id }, GroupDto);
        }

        [Route("GetAllByFilter")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<GroupDto>>> GetAllByFilter([FromQuery] string filter)
        {
            return Accepted(await _service.GetCollection(filter));
        }

        [Route("GetAllByTeacherId")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<GroupDto>>> GetAllByTeacherId ([FromQuery] int userId)
        {
            IEnumerable<GroupDto> collection;
            try
            {
                collection = await _service.GetCollectionByTeacherId(userId);
            } catch(NullReferenceException e)
            {
                return NotFound(e.Message);
            } catch(LetSkoleException e)
            {
                return BadRequest(e.Message + " " + e.value);
            }
            return Ok(collection);
        }

        [Route("Update")]
        [HttpPut]
        public async Task<IActionResult> Put([FromQuery] GroupDto groupDto, [FromQuery] int userId)
        {
            try
            {
                await _service.Update(groupDto, userId);
            } catch (Exception e)
            {
                return BadRequest(e.Message);
            }
            return Accepted();
        }

        [Route("Delete")]
        [HttpDelete]
        public async Task<IActionResult> Delete([FromQuery] int id)
        {
            try
            {
                await _service.Delete(id);
            } catch(Exception e)
            {
                return BadRequest(e.Message);
            }
            return Accepted();
        }

        [Route("GetById")]
        [HttpGet]
        public async Task<ActionResult<GroupDto>> GetItemById ([FromQuery] int id)
        {
            GroupDto group;
            try {
                group = await _service.GetItem(id);
            } catch(Exception e)
            {
                return BadRequest(e.Message);
            }
            return Accepted(group);
        }

    }
}
