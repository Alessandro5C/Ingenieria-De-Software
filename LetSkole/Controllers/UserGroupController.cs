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
    [Route("api/v1/[controller]/[action]")]
    public class UserGroupController : ControllerBase
    {
        private readonly IUserGroupService _service;

        public UserGroupController(IUserGroupService service)
        {
            _service = service;
        }

        [HttpPost]
        public void Post([FromBody] UserGroupDto userGroupDto)
        {
            _service.Create(userGroupDto);
        }

        [HttpGet]
        public IEnumerable<UserGroupDto> GetItemById([FromQuery] int filter)
        {
            return _service.GetItems(filter);
        }

        
        [HttpDelete]
        public void DeleteUsingGroup([FromQuery] int groupId)
        {
            _service.DeleteUsingGroup(groupId);
        }

        [HttpDelete]
        public void DeleteUsingUser([FromQuery] int userId,int groupId)
        {
            _service.DeleteUsingUser(userId,groupId);
        }

        [HttpPut]
        public void Put([FromBody] UserGroupDto userGroupDto)
        {
            _service.Update(userGroupDto);
        }

    }
}
