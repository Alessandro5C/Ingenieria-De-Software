using LetSkole.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace LetSkole.DataAccess
{
    public class UserGroupRepository : IUserGroupRepository
    {
        private readonly LetSkoleDbContext _context;

        public UserGroupRepository(LetSkoleDbContext context)
        {
            _context = context;
        }

        public async Task<UserGroup> GetItem(int userId, int groupId)
        {
            UserGroup userGroup = await _context.UserGroups.
                FindAsync(userId, groupId);
            userGroup.User = await  _context.Users.FindAsync(userId);
            userGroup.Group = await _context.Groups.FindAsync(groupId);
            return userGroup; 
        }

        public async Task Create(UserGroup entity)
        {
            _context.Set<UserGroup>().Add(entity);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteUsingGroup(int groupId)
        {
            //Este todavía no lo voy a implementar
            throw new NotImplementedException();
        }

        public async Task DeleteUsingUser(int userId, int groupId)
        {
            _context.Entry(new UserGroup
            {
                UserId = userId,
                GroupId = groupId
            }).State = EntityState.Deleted;
            await _context.SaveChangesAsync();
        }

        public async Task<ICollection<UserGroup>> GetItems(int filter)
        {
            return  await _context.UserGroups.Where(c => c.GroupId.Equals(filter))
                .ToListAsync();
        }

        public async Task Update(UserGroup entity)
        {
            _context.Set<UserGroup>().Attach(entity);
            _context.Entry(entity).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task<ICollection<UserGroup>> GetItemsByTeacherId(int userId)
        {
            return await _context.UserGroups.Where(c => c.UserId.Equals(userId))
                .ToListAsync();
        }
        public async Task<int> SearchGrade(int userId, int groupId)
        {
            UserGroup userGroup = await _context.UserGroups.
               FindAsync(userId, groupId);
            userGroup.User = await _context.Users.FindAsync(userId);
            userGroup.Group = await _context.Groups.FindAsync(groupId);
            int grade = userGroup.Grade;
            return grade;
        }
    }
}
