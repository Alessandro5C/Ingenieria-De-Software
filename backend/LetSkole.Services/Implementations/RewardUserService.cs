using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using LetSkole.DataAccess;
using LetSkole.Dto;
using LetSkole.Entities;

namespace LetSkole.Services.Implementations
{
    public class RewardUserService : IRewardUserService
    {
        private readonly IRewardUserRepository _repository;
        private readonly IMapper _mapper;

        public RewardUserService(IRewardUserRepository repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        public async Task<RxuResponse> Create(string userId, int rewardId)
        {
            // CHECK IF ALREADY CREATED
            var entity = await _repository
                .GetItemByIds(userId, rewardId);
            if (entity != null)
                throw new LetSkoleException(
                    "Bad Request: Already created", 400);

            // RETRIEVE OBJECT HERE
            var reward = await _repository.GetRewardById(rewardId);
            if (reward == null)
                throw new LetSkoleException(
                    "RewardId does not match any group", 404);

            // CREATE OBJECT HERE
            entity = new RewardUser
            {
                UserId = userId,
                RewardId = rewardId,
            };

            // REPOSITORY CALLS HERE
            try
            {
                await _repository.Create(entity);
            }
            catch (Exception e)
            {
                throw new LetSkoleException(e.Message, 404);
            }

            return _mapper.Map<RewardUser, RxuResponse>(entity);
        }

        public async Task Delete(string userId, int rewardId)
        {
            // RETRIEVE OBJECT HERE
            const string message = "Keys do not match any user-group";
            var entity = await _repository.GetItemByIds(userId, rewardId);
            if (entity == null) throw new LetSkoleException(message, 404);
            if (entity.UserId != userId) throw new LetSkoleException(403);

            // REPOSITORY CALLS HERE
            await _repository.Delete(entity);
        }

        public async Task<IEnumerable<RxuResponse>>
            GetEnumerableByGameId(string userId, int gameId)
        {
            var collection = await _repository.GetCollectionByGameId(userId, gameId);

            return collection.Select(
                e => _mapper.Map<RewardUser, RxuResponse>(e)
            ).ToList();
        }
    }
}