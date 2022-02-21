using System;
using System.Collections.Generic;
using System.Text;

namespace LetSkole.Dto
{
    public class UserGroupDto
    {
        public string UserId { get; set; }
        public AppUserProfileDto UserDto { get; set; }
        public int GroupId { get; set; }
        public GroupRequest GroupRequest { get; set; }
        public short Grade { get; set; }
    }
}
