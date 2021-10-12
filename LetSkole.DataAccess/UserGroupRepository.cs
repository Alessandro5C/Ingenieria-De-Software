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
            _context.Set<UserGroup>().Add(entity);
            _context.SaveChanges();
        }

        public void DeleteUsingGroup(int GroupId)
        {
            throw new NotImplementedException();
        }

        public void DeleteUsingUser(int UserId, int GroupId)
        {
            throw new NotImplementedException();
        }

        public ICollection<UserGroup> GetItems(int filter)
        {
            return _context.userGroups.Where(c => c.GroupId.Equals(filter))
                .ToList();
        }

        

        public void Update(UserGroup entity)
        {
            throw new NotImplementedException();
        }
    }
}
