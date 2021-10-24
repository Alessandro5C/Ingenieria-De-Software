using LetSkole.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace LetSkole.DataAccess
{
    public interface IUserGroupRepository 
    {
        Task<ICollection<UserGroup>> GetItems(int filter);

        Task<ICollection<UserGroup>> GetItemsByTeacherId(int id);
        Task<UserGroup> GetItem (int userId, int groupId);
        Task Create(UserGroup entity);
        Task Update (UserGroup entity);
        Task DeleteUsingUser (int userId, int groupId);
        Task DeleteUsingGroup (int groupId);
        Task<int> SearchGrade (int userId, int groupId);
    }
}
