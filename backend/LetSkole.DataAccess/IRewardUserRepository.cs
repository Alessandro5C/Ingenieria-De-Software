using LetSkole.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace LetSkole.DataAccess
{
    public interface IRewardUserRepository
    {
        Task<RewardUser> GetItemByIds(string userId, int rewardId);

        Task Create(RewardUser entity);
        Task Delete(RewardUser entity);
        
        Task<ICollection<RewardUser>> GetCollectionByGameId(
            string userId, int gameId);
        
        Task<Reward> GetRewardById(int rewardId);
    }
}