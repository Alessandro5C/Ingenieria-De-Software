using LetSkole.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace LetSkole.DataAccess
{
    public class RewardsRepository : IRewardsRepository
    {
        private readonly LetSkoleDbContext _context;

        public RewardsRepository(LetSkoleDbContext context)
        {
            //Representa mi base de datos
            _context = context;
        }

        public void Create(Reward entity)
        {
            _context.Set<Reward>().Add(entity);
            _context.SaveChanges();
        }

        public void Delete(int id)
        {
            _context.Entry(new Reward
            {
                Id = id
            }).State = EntityState.Deleted;
            _context.SaveChanges();
        }

        public ICollection<Reward> GetCollection(string filter)
        {
            return _context.Rewards.Where(c => c.Name.Contains(filter))
                .ToList();
        }

        public Reward GetItem(int id)
        {
            return _context.Rewards.Find(id);
        }
        public void Update(Reward entity)
        {
            _context.Set<Reward>().Attach(entity);
            _context.Entry(entity).State = EntityState.Modified;
            _context.SaveChanges();
        }
    }
}
