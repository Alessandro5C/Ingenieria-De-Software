using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using LetSkole.Dto;
using LetSkole.Services;

namespace LetSkole.Controllers
{
    [Route("api/v1/[controller]/[action]")]
    [ApiController]
    public class RewardController : ControllerBase
    {
        private readonly IRewardService _service;

        public RewardController(IRewardService service)
        {
            _service = service;
        }
        [HttpPost]
        public void Post([FromBody] RewardDto rewardDto)
        {
            _service.Create(rewardDto);
        }

        [HttpGet]
        public IEnumerable<RewardDto> GetAllByFilter([FromQuery] string filter)
        {
            return _service.GetCollection(filter);
        }

        [HttpGet]
        public RewardDto GetItemById([FromQuery] int id)
        {
            return _service.GetItem(id);
        }

        [HttpPut]
        public void Put([FromQuery] RewardDto rewardDto)
        {
            _service.Update(rewardDto);
        }

        [HttpDelete]
        public void Delete([FromQuery] int id)
        {
            _service.Delete(id);
        }

    }
}