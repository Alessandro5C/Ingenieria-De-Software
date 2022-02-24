using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using LetSkole.Entities;
using LetSkole.Entities.Indentity;
using Microsoft.EntityFrameworkCore;

namespace LetSkole.DataAccess.Implementations
{
    public class UserGroupRepository : IUserGroupRepository
    {
        private readonly LetSkoleDbContext _context;

        public UserGroupRepository(LetSkoleDbContext context)
        {
            _context = context;
        }

        public async Task<UserGroup> GetItemByIds(string userId, int groupId)
        {
            var entity = await _context.UserGroups
                .FindAsync(userId, groupId);
            if (entity == null) return null;
            entity.Group = await _context.Groups.FindAsync(groupId);
            return entity;
        }

        public async Task Create(UserGroup entity)
        {
            _context.UserGroups.Add(entity);
            await _context.SaveChangesAsync();
        }

        public async Task Update(UserGroup entity)
        {
            _context.UserGroups.Update(entity);
            await _context.SaveChangesAsync();
        }

        public async Task Delete(UserGroup entity)
        {
            _context.UserGroups.Remove(entity);
            await _context.SaveChangesAsync();
        }

        public async Task<ICollection<UserGroup>> GetCollectionByGroupId(int groupId)
        {
            return await (
                from u in _context.Users
                join uxg in _context.UserGroups on u.Id equals uxg.UserId
                join g in _context.Groups on uxg.GroupId equals g.Id
                where g.Id == groupId
                select new UserGroup
                {
                    Grade = uxg.Grade,
                    GroupId = uxg.GroupId,
                    UserId = uxg.UserId,
                    User = u
                }
            ).ToListAsync();
        }

        // NOTE: Below her are defined **special** methods 

        public async Task<ApplicationUser> GetUserByEmail(string email)
        {
            return await _context.Users
                .SingleOrDefaultAsync(e => e.Email.Equals(email));
        }

        public async Task<Group> GetGroupById(int groupId)
        {
            return await _context.Groups.FindAsync(groupId);
        }
    }
}