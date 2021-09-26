using LetSkole.DataAccess;
using LetSkole.Dto;
using LetSkole.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Linq;


namespace LetSkole.Services
{
    public class RewardService : IRewardService
    {
        private readonly IRewardsRepository _repository;

        public RewardService(IRewardsRepository repository)
        {
            _repository = repository;
        }

        public void Create(RewardDto entity)
        {
            _repository.Create(new Reward

            {
                Name = entity.Name,
                Description = entity.Description,
            });
        }

        public void Delete(int id)
        {
            throw new NotImplementedException();
        }

        public ICollection<RewardDto> GetCollection(string filter)
        {
            var Collection = _repository.GetCollection(filter ?? string.Empty);
            return Collection.Select(c => new RewardDto
            {
                Description = c.Description,
                Name = c.Name,
            }).ToList();
        }

        public RewardDto GetItem(int id)
        {
            Reward reward = _repository.GetItem(id);
            RewardDto rewardDto = new RewardDto();
            rewardDto.Id = reward.Id;
            rewardDto.Name = reward.Name;
            rewardDto.Description = reward.Description;
            return rewardDto;
        }

        public void Update(int id, RewardDto entity)
        {
            throw new NotImplementedException();
        }
    }
}
