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
        public void Post([FromBody] ActivityDto ActivityDto)
        {
            _service.Create(ActivityDto);
        }

        [HttpGet]
        public IEnumerable<ActivityDto> GetAllByFilter([FromQuery] string filter)
        {
            return _service.GetCollection(filter);
        }
        
        [HttpGet]
        public ActivityDto GetItemById ([FromQuery] int id)
        {
            return _service.GetItem(id);
        }

        [HttpDelete]
        public void Delete ([FromQuery] int id)
        {
            _service.Delete(id);
        }

        [HttpPut]
        public void Put ([FromQuery] ActivityDto activityDto)
        {
            _service.Update(activityDto);
        }


    }



}
