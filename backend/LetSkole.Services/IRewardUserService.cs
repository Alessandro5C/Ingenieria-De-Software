using System.Collections.Generic;
using System.Threading.Tasks;
using LetSkole.Dto;

namespace LetSkole.Services
{
    public interface IRewardUserService
    {
        Task<RxuResponse> Create(string userId, int rewardId);
        Task Delete(string userId, int rewardId);
        
        Task<IEnumerable<RxuResponse>>
            GetEnumerableByGameId(string userId, int gameId);
    }
}