using LetSkole.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace LetSkole.DataAccess
{
    public class ActivityRepository : IActivityRepository
    {
        private readonly LetSkoleDbContext _context;

        public ActivityRepository(LetSkoleDbContext context)
        {
            _context = context;
        }

        public void Create(Activity entity)
        {
            _context.Set<Activity>().Add(entity);
            _context.SaveChanges();
        }

        public void Delete(int id)
        {
            _context.Entry(new Activity
            {
                Id = id
            }).State = EntityState.Deleted;
            _context.SaveChanges();
        }

        public ICollection<Activity> GetActivities(string filter)
        {
            return _context.Activities.Where(c => c.Name.Contains(filter))
                .ToList();
        }

        public Activity GetItem(int id)
        {
            return _context.Activities.Find(id);
        }

        public void Update(Activity entity)
        {
            _context.Set<Activity>().Attach(entity);
            _context.Entry(entity).State = EntityState.Modified;
            _context.SaveChanges();
        }
    }
}
