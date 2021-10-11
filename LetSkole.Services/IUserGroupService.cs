using LetSkole.Dto;
using System;
using System.Collections.Generic;
using System.Text;

namespace LetSkole.Services
{
    public interface IUserGroupService
    {
        ICollection<UserGroupDto> GetItems(int filter);
        
        void Create(UserGroupDto entity);
        void Update(UserGroupDto entity);
        void DeleteUsingUser(int UserId, int GroupId);
        void DeleteUsingGroup(int GroupId);

    }
}
