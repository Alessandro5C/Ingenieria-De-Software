using LetSkole.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace LetSkole.DataAccess
{
    public class UserGroupRepository : IUserGroupRepository
    {
        private readonly LetSkoleDbContext _context;

        public UserGroupRepository(LetSkoleDbContext context)
        {
            _context = context;
        }

        public UserGroup GetItem(int userId, int groupId)
        {
            return _context.UserGroups.Find(userId, groupId);
        }

        public void Create(UserGroup entity)
        {
            _context.Set<UserGroup>().Add(entity);
            _context.SaveChanges();
        }

        public void DeleteUsingGroup(int groupId)
        {
            //Este todavía
            throw new NotImplementedException();
        }

        public void DeleteUsingUser(int userId, int groupId)
        {
            _context.Entry(new UserGroup
            {
                UserId = userId,
                GroupId = groupId
            }).State = EntityState.Deleted;
            _context.SaveChanges();
        }

        //Devuelve todos los alumnos que se encuentran en el salon "filter"
        public ICollection<UserGroup> GetItems(int filter)
        {
            return _context.UserGroups.Where(c => c.GroupId.Equals(filter))
                .ToList();
        }

        public void Update(UserGroup entity)
        {
            _context.Set<UserGroup>().Attach(entity);
            _context.Entry(entity).State = EntityState.Modified;
            _context.SaveChanges();
        }
    }
}
