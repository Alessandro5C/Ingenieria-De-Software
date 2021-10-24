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
            await _service.Create(ActivityDto);
            return CreatedAtAction(nameof(GetItemById), new { id = ActivityDto.Id });
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ActivityDto>>> GetAllByFilter([FromQuery] string filter)
        {
            return Accepted(await _service.GetCollection(filter));
        }
        
        [HttpGet]
        public async Task<ActionResult<ActivityDto>> GetItemById ([FromQuery] int id)
        {
            return Ok( await _service.GetItem(id));
        }

        [HttpDelete]
        public async Task<IActionResult> Delete ([FromQuery] int id)
        {
            await _service.Delete(id);
            return NoContent();
        }

        [HttpPut]
        public async Task<IActionResult> Put ([FromQuery] ActivityDto activityDto)
        {
            await _service.Update(activityDto);
            return Accepted();
        }


    }



}
