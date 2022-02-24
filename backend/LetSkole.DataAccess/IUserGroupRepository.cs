using LetSkole.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;
using LetSkole.Entities.Indentity;

namespace LetSkole.DataAccess
{
    public interface IUserGroupRepository
    {
        Task<UserGroup> GetItemByIds(string userId, int groupId);

        Task Create(UserGroup entity);
        Task Update(UserGroup entity);
        Task Delete(UserGroup entity);

        Task<ICollection<UserGroup>> GetCollectionByGroupId(int groupId);

        Task<ApplicationUser> GetUserByEmail(string email);
        Task<Group> GetGroupById(int groupId);
    }
}