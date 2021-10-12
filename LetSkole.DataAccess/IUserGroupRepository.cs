using LetSkole.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace LetSkole.DataAccess
{
    public interface IUserGroupRepository 
    {
        ICollection<UserGroup> GetItems(int filter);
        void Create(UserGroup entity);
        void Update(UserGroup entity);
        void DeleteUsingUser(int UserId, int GroupId);
        void DeleteUsingGroup(int GroupId);
    }
}
