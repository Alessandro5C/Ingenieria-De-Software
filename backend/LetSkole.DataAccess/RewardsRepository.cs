using LetSkole.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LetSkole.DataAccess
{
    public class RewardsRepository : IRewardsRepository
    {
        private readonly LetSkoleDbContext _context;

        public RewardsRepository(LetSkoleDbContext context)
        {

            _context = context;
        }

        public async Task Create(RewardUser entity)
        {
            _context.Set<RewardUser>().Add(entity);
            await _context.SaveChangesAsync();
        }

        public async Task Delete(int id)
        {
            _context.Entry(new Reward
            {
                Id = id
            }).State = EntityState.Deleted;
            await _context.SaveChangesAsync();
        }

        public async Task<ICollection<Reward>> GetCollection(string filter)
        {
            return await _context.Rewards.Where(c => c.Name.Contains(filter))
                .ToListAsync();
        }

        public async Task<ICollection<RewardUser>> GetCollectionRewardUser(int userId)
        {
            return await _context.RewardUsers.Where(c => c.UserId.Equals(userId))
                .ToListAsync();
        }

        public async Task<Reward> GetItem(int id)=>
            await _context.Rewards
                .SingleOrDefaultAsync(c => c.Id.Equals(id));
    


    }
}
