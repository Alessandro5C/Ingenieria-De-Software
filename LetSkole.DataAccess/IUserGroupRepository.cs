using LetSkole.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace LetSkole.DataAccess
{
    public interface IUserGroupRepository 
    {
        ICollection<UserGroup> GetItems(int filter);

        ICollection<UserGroup> GetItemsByTeacherId(int id);
        UserGroup GetItem(int userId, int groupId);
        void Create(UserGroup entity);
        void Update(UserGroup entity);
        void DeleteUsingUser(int userId, int groupId);
        void DeleteUsingGroup(int groupId);
    }
}
