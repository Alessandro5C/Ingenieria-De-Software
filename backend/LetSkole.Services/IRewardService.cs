using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using LetSkole.Dto;

namespace LetSkole.Services
{
    public interface IRewardService
    {
        Task <ICollection<RewardDto>> GetCollection(string filter);
        Task<RewardDto> GetItem(int id);
        Task Delete(int id);

        Task CreateRewardxUser(RewardUserDto entity);
        Task<ICollection<RewardUserDto>> GetCollectionRewardUser(int userId);

    }
}
