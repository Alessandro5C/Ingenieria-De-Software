using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using LetSkole.Entities;
using Microsoft.EntityFrameworkCore;

namespace LetSkole.DataAccess.Implementations
{
    public class GroupRepository : IGroupRepository
    {
        private readonly LetSkoleDbContext _context;

        public GroupRepository(LetSkoleDbContext context)
        {
            _context = context;
        }

        public async Task<Group> GetItemById(int id)
        {
            return await _context.Groups
                .SingleOrDefaultAsync(e => e.Id.Equals(id));
        }

        public async Task Create(Group entity)
        {
            _context.Groups.Add(entity);
            await _context.SaveChangesAsync();
        }

        public async Task Update(Group entity)
        {
            _context.Groups.Update(entity);
            await _context.SaveChangesAsync();
        }

        public async Task Delete(Group entity)
        {
            _context.Groups.Remove(entity);
            await _context.SaveChangesAsync();
        }

        public async Task<ICollection<Group>> GetCollectionByUserId(string userId)
        {
            return await (
                from uxg in _context.UserGroups
                join g in _context.Groups on uxg.GroupId equals g.Id
                where uxg.ApplicationUserId == userId
                select g
            ).ToListAsync();
        }

        public async Task<ICollection<Group>> GetCollectionByOwnerId(string ownerId)
        {
            return await (
                from g in _context.Groups
                where g.OwnerId == ownerId
                select g
            ).ToListAsync();
        }
    }
}