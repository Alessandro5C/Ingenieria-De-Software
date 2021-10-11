using LetSkole.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

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
            _context.Entry(new UserGroup
            {
                GroupId = GroupId
            }).State = EntityState.Deleted;
            _context.SaveChanges();
        }

        public void DeleteUsingUser(int UserId)
        {
            _context.Entry(new UserGroup
            {
                UserId = UserId
            }).State = EntityState.Deleted;
            _context.SaveChanges();
        }

        public ICollection<UserGroup> GetActivities(string filter)
        {
            return _context.userGroups
               .ToList();
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
