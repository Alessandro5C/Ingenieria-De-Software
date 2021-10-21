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

        void Update(RewardDto entity);

        void Delete(int id);

    }
}
