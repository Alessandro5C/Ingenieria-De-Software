using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using LetSkole.Dto;
using LetSkole.Services;
using Microsoft.AspNetCore.Mvc;

namespace LetSkole.Controllers
{
    [Route("api/v1/[controller]/[action]")]
    [ApiController]
    public class ActivityController : ControllerBase
    {
        private readonly IActivityService _service;

        public ActivityController(IActivityService service)
        {
            _service = service;
        }

        [HttpPost]
        public async Task<ActionResult<ActivityDto>> Post([FromBody] ActivityDto ActivityDto)
        {
            
            try
            {
                await _service.Create(ActivityDto);
            } 
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }

            return CreatedAtAction(nameof(GetItemById), new { id = ActivityDto.Id }, ActivityDto);
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ActivityDto>>> GetAllByFilter([FromQuery] string filter)
        {
            return Accepted(await _service.GetCollection(filter));
        }


        [HttpGet]
        public async Task<ActionResult<IEnumerable<ActivityDto>>> GetAllByUserID([FromQuery] int id)
        {
            return Accepted(await _service.GetCollectionUserID(id));
        }

        [HttpGet]
        public async Task<ActionResult<ActivityDto>> GetItemById ([FromQuery] int id)
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
        public async Task<IActionResult> Delete ([FromQuery] int id)
        {
            await _service.Delete(id);
            return NoContent();
        }

        [HttpPut]
        public async Task<IActionResult> Put ([FromBody] ActivityDto activityDto)
        {
            await _service.Update(activityDto);
            return Accepted();
        }


    }



}
