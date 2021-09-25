using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using LetSkole.Dto;
using LetSkole.Services;
using Microsoft.AspNetCore.Mvc;

namespace LetSkole.Controllers
{
    [Route("api/v1/[controller]")]
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

    }
}