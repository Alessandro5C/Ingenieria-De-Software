using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using LetSkole.Entities;
using Microsoft.EntityFrameworkCore;

namespace LetSkole.DataAccess.Implementations
{
    public class RewardUserRepository : IRewardUserRepository
    {
        private readonly LetSkoleDbContext _context;

        public RewardUserRepository(LetSkoleDbContext context)
        {
            _context = context;
        }

        public async Task<RewardUser> GetItemByIds(string userId, int rewardId)
        {
            return await _context.RewardUsers
                .FindAsync(userId, rewardId);
        }

        public async Task Create(RewardUser entity)
        {
            _context.RewardUsers.Add(entity);
            await _context.SaveChangesAsync();
        }

        public async Task Delete(RewardUser entity)
        {
            _context.RewardUsers.Remove(entity);
            await _context.SaveChangesAsync();
        }

        public async Task<ICollection<RewardUser>> GetCollectionByGameId(
            string userId, int gameId)
        {
            var rewardsUser =
                from rxu in _context.RewardUsers
                where rxu.UserId == userId
                select rxu;

            return await (
                from r in _context.Rewards
                join rxu in rewardsUser on r.Id equals rxu.RewardId
                    into rxuResult
                from rxu in rxuResult.DefaultIfEmpty()
                where r.GameId == gameId
                select new RewardUser
                {
                    // UserId = rxu != null ? rxu.UserId : string.Empty,
                    UserId = rxu.UserId
                             ?? string.Empty,
                    RewardId = r.Id,
                    Reward = r
                }
            ).ToListAsync();
        }

        public async Task<Reward> GetRewardById(int rewardId)
        {
            return await _context.Rewards.FindAsync(rewardId);
        }
    }
}