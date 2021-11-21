using LetSkole.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LetSkole.DataAccess
{
    public class ActivityRepository : IActivityRepository
    {
        private readonly LetSkoleDbContext _context;

        public ActivityRepository(LetSkoleDbContext context)
        {
            _context = context;
        }

        public async Task<ICollection<Activity>> GetActivities(string filter)
        {
            return await _context.Activities.Where(c => c.Name.Contains(filter))
                   .ToListAsync();
        }

        public async Task<ICollection<Activity>> GetCollectionByID(int userId)
        {
            return await _context.Activities.Where(c => c.UserId.Equals(userId))
                   .ToListAsync();
        }
        
        public async Task<Activity> GetItem(int id)=>
            await _context.Activities
            .SingleOrDefaultAsync(c => c.Id.Equals(id));
        

        public async Task Create(Activity entity)
        {
            _context.Add(entity);
            await _context.SaveChangesAsync();
        }

        public async Task Update(Activity entity)
        {
            _context.Attach(entity);
            _context.Entry(entity).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task Delete(int id)
        {
            _context.Entry(new Activity
            {
               Id = id
             }).State = EntityState.Deleted;
            await _context.SaveChangesAsync();
        }
    }
}
