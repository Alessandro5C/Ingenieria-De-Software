using LetSkole.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using LetSkole.Entities.Indentity;
using Microsoft.AspNetCore.Identity;

namespace LetSkole.DataAccess
{
    public class UserGroupRepository : IUserGroupRepository
    {
        private readonly LetSkoleDbContext _context;
        private readonly UserManager<ApplicationUser> _userManager;

        public UserGroupRepository(LetSkoleDbContext context, UserManager<ApplicationUser> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        public async Task<UserGroup> GetItem(string userId, int groupId)
        {
            var userGroup = await _context.UserGroups.
                FindAsync(userId, groupId);
            // userGroup.ApplicationUser = await _context.Users.FindAsync(userId);
            userGroup.ApplicationUser = await _userManager.FindByIdAsync(userId);
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

        public async Task DeleteUsingUser(string userId, int groupId)
        {
            _context.Entry(new UserGroup
            {
                ApplicationUserId = userId,
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

        public async Task<ICollection<UserGroup>> GetItemsByTeacherId(string userId)
        {
            return await _context.UserGroups.Where(c => c.ApplicationUserId.Equals(userId))
                .ToListAsync();
        }
        public async Task<int> SearchGrade(string userId, int groupId)
        {
            UserGroup userGroup = await _context.UserGroups.
               FindAsync(userId, groupId);
            // userGroup.ApplicationUser = await _context.Users.FindAsync(userId);
            userGroup.ApplicationUser = await _userManager.FindByIdAsync(userId);
            userGroup.Group = await _context.Groups.FindAsync(groupId);
            int grade = userGroup.Grade;
            return grade;
        }
    }
}
