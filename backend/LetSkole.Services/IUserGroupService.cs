using LetSkole.Dto;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace LetSkole.Services
{
    public interface IUserGroupService
    {
        Task<ICollection<UserGroupDto>> GetItems(int groupId);
        Task Create(UserGroupDto entity);
        Task Update(UserGroupDto entity);
        Task DeleteUsingUser(int userId, int groupId);
        Task DeleteUsingGroup(int GroupId);
        Task<int> SearchGrade(int userId, int groupId);
    }
}
