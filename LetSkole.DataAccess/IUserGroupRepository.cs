using LetSkole.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace LetSkole.DataAccess
{
    public interface IUserGroupRepository
    {
        ICollection<UserGroup> GetActivities(string filter);
        UserGroup GetItem(int CursoId);
        void Create(UserGroup entity);
        void Update(UserGroup entity);
        void DeleteUsingUser(int UserId);
        void DeleteUsingGroup(int GroupId);
    }
}
