using LetSkole.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace LetSkole.DataAccess
{
    public interface IRewardsRepository
    {
        Task <ICollection<Reward>> GetCollection(string filter);
        Task <Reward> GetItem(int id);
        Task Delete(int userid,int rewardid);

        Task Create(RewardUser entity);
        Task<ICollection<Reward>> GetCollectionRewardUser(int userId);

    }
}
