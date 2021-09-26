using System;
using System.Collections.Generic;
using System.Text;
using LetSkole.Dto;

namespace LetSkole.Services
{
    public interface IRewardService
    {
        ICollection<RewardDto> GetCollection(string filter);
        RewardDto GetItem(int id);

        void Create(RewardDto entity);

        void Update(int id, RewardDto entity);

        void Delete(int id);

    }
}
