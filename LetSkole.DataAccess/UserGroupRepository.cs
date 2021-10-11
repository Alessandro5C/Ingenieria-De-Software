using LetSkole.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Linq;

namespace LetSkole.DataAccess
{
    public class UserGroupRepository : IUserGroupRepository
    {
        private readonly LetSkoleDbContext _context;

        public UserGroupRepository(LetSkoleDbContext context)
        {
            _context = context;
        }
        public void Create(UserGroup entity)
        {
            throw new NotImplementedException();
        }

        public void DeleteUsingGroup(int GroupId)
        {
            throw new NotImplementedException();
        }

        public void DeleteUsingUser(int UserId, int GroupId)
        {
            throw new NotImplementedException();
        }

        public ICollection<UserGroup> GetActivities(string filter)
        {
            throw new NotImplementedException();
        }

        public UserGroup GetItem(int CursoId)
        {
            throw new NotImplementedException();
        }

        public void Update(UserGroup entity)
        {
            throw new NotImplementedException();
        }
    }
}
