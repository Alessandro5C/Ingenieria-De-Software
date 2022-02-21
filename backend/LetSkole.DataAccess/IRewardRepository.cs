using LetSkole.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace LetSkole.DataAccess
{
    public interface IRewardRepository
    {
        // Task <ICollection<Reward>> GetCollection(string filter);
        Task <Reward> GetItem(int id);
        Task CreateForUser(RewardUser entity);
        Task DeleteForUser(string userId,int rewardId);
        
        Task<ICollection<Reward>> GetCollectionByUserId(string userId);
        Task<ICollection<Reward>> GetCollectionByGameId(int gameId);
    }
}
