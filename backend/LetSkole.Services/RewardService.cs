using LetSkole.DataAccess;
using LetSkole.Dto;
using LetSkole.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Linq;
using System.Threading.Tasks;

namespace LetSkole.Services
{
    public class RewardService : IRewardService
    {
        private readonly IRewardsRepository _repository;
        private readonly IUserRepository _userRepository;

        public RewardService(IRewardsRepository repository,IUserRepository userRepository)
        {
            _repository = repository;
            _userRepository = userRepository;
        }


        public async Task CreateRewardxUser(RewardUserDto entity)
        {

            await _repository.Create(new RewardUser
            {
                ApplicationUserId = entity.UserId,
                RewardId = entity.RewardId
            });
        }

        public async Task Delete(string userId, int rewardId)
        {
            await _repository.Delete(userId,rewardId);
        }

        public async Task<ICollection<RewardDto>> GetCollection(string filter)
        {
            var Collection = await _repository.GetCollection(filter ?? string.Empty);
            return Collection.Select(c => new RewardDto
            {
                Id=c.Id,
                GameId = c.GameId,
                Description = c.Description,
                Name = c.Name,
                Image = c.Image,
            }).ToList();
        }

        public async Task<ICollection<RewardDto>> GetCollectionRewardUser(string userId)
        {
            var Collection = await _repository.GetCollectionRewardUser(userId);

            return Collection.Select(c => new RewardDto
            {
                Id = c.Id,
                GameId = c.GameId,
                Description = c.Description,
                Name = c.Name,
                Image = c.Image,
            }).ToList();
        }

        public async Task<RewardDto> GetItem(int id)
        {
            Reward reward = await _repository.GetItem(id);
            RewardDto rewardDto = new RewardDto();
            rewardDto.Id = reward.Id;
            rewardDto.GameId = reward.GameId;
            rewardDto.Name = reward.Name;
            rewardDto.Description = reward.Description;
            rewardDto.Image = reward.Image;
            return rewardDto;
        }

    }
}
