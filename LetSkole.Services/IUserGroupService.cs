using LetSkole.Dto;
using System;
using System.Collections.Generic;
using System.Text;

namespace LetSkole.Services
{
    public interface IUserGroupService
    {
        ICollection<UserGroupDto> GetItems(int groupId);
        
        void Create(UserGroupDto entity);
        void Update(UserGroupDto entity);
        void DeleteUsingUser(int userId, int groupId);
        void DeleteUsingGroup(int GroupId);
        int SearchGrade(int userId, int groupId);
    }
}
