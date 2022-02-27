using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using LetSkole.Entities;
using Microsoft.EntityFrameworkCore;

namespace LetSkole.DataAccess.Implementations
{
    public class ActivityRepository : IActivityRepository
    {
        private readonly LetSkoleDbContext _context;

        public ActivityRepository(LetSkoleDbContext context)
        {
            _context = context;
        }

        public async Task<Activity> GetItemById(int id)
        {
            return await _context.Activities.FindAsync(id);
        }

        public async Task Create(Activity entity)
        {
            _context.Activities.Add(entity);
            await _context.SaveChangesAsync();
        }

        public async Task Update(Activity entity)
        {
            _context.Activities.Update(entity);
            await _context.SaveChangesAsync();
        }

        public async Task Delete(Activity entity)
        {
            _context.Activities.Remove(entity);
            await _context.SaveChangesAsync();
        }

        public async Task<ICollection<Activity>> GetCollectionByUserId(string userId)
        {
            return await (
                from a in _context.Activities
                where a.UserId == userId
                select a
            ).ToListAsync();
        }
    }
}