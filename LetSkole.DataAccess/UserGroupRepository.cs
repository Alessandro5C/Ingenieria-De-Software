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
            UserGroup userGroup = _context.UserGroups.
                Find(userId, groupId);
            userGroup.User = _context.Users.Find(userId);
            userGroup.Group = _context.Groups.Find(groupId);
            return userGroup;
        }

        public void Create(UserGroup entity)
        {
            _context.Set<UserGroup>().Add(entity);
            _context.SaveChanges();
        }

        public void DeleteUsingGroup(int groupId)
        {
            //Este todavía no lo voy a implementar
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

        public ICollection<UserGroup> GetItemsByTeacherId(int id)
        {
            return _context.UserGroups.Where(c => c.UserId.Equals(id))
                .ToList();
        }
    }
}
