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

        public RewardService(IRewardsRepository repository)
        {
            _repository = repository;
        }

        public async Task Create(RewardDto entity)
        {
            await _repository.Create(new Reward
            {
                GameId = entity.GameId,
                Name = entity.Name,
                Description = entity.Description,
                Image = entity.Image,
            });
        }

        public async Task Delete(int id)
        {
            await _repository.Delete(id);
        }

        public async Task<ICollection<RewardDto>> GetCollection(string filter)
        {
            var Collection = await _repository.GetCollection(filter ?? string.Empty);
            return Collection.Select(c => new RewardDto
            {
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

        public async Task Update(RewardDto entity)
        {
            Reward reward = await _repository.GetItem(entity.Id);
            reward.GameId = entity.GameId;
            reward.Name = entity.Name;
            reward.Description = entity.Description;
            reward.Image = entity.Image;
            await _repository.Update(reward);
        }
    }
}
