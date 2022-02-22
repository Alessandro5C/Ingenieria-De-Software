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
    public class GroupService : IGroupService
    {
        private readonly IGroupRepository _repository;
        private readonly IMapper _mapper;

        public GroupService(IGroupRepository repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        public async Task<GroupResponse> Create(string ownerId, GroupRequestForPost model)
        {
            // VALIDATE DATA HERE
            const string message = "Bad Request: Name(from 1-20), Description(from 1-256), MaxGrade(from 0-int)";
            if (string.IsNullOrEmpty(model.Name) ||
                string.IsNullOrEmpty(model.Description) ||
                model.MaxGrade <= 0)
                throw new LetSkoleException(message, 400);

            var entity = new Group
            {
                OwnerId = ownerId,
                Name = model.Name,
                Description = model.Description,
                MaxGrade = model.MaxGrade
            };

            try
            {
                await _repository.Create(entity);
            }
            catch (Exception e)
            {
                throw new LetSkoleException(e.Message, 400);
            }

            return _mapper.Map<Group, GroupResponse>(entity);
        }

        public async Task Update(string ownerId, GroupRequestForPut model, int id)
        {
            // VALIDATE DATA HERE
            const string message = "Bad Request: Name(lenght 1-20), Description(lenght 1-256)";
            if (string.IsNullOrEmpty(model.Name) ||
                string.IsNullOrEmpty(model.Description))
                throw new LetSkoleException(message, 400);

            var entity = await _repository.GetItemById(id);
            if (entity == null) throw new LetSkoleException(404);
            if (entity.OwnerId != ownerId) throw new LetSkoleException(403);

            // MODIFY DATA HERE
            entity.Name = model.Name;
            entity.Description = model.Description;

            try
            {
                await _repository.Update(entity);
            }
            catch (Exception e)
            {
                throw new LetSkoleException(e.Message, 400);
            }
        }

        public async Task Delete(string ownerId, int id)
        {
            var entity = await _repository.GetItemById(id);
            if (entity == null) throw new LetSkoleException(404);
            if (entity.OwnerId != ownerId) throw new LetSkoleException(403);

            await _repository.Delete(entity);
        }

        public async Task<IEnumerable<GroupResponse>> GetEnumerableByUserId(string userId)
        {
            var collection = await _repository.GetCollectionByUserId(userId);

            return collection.Select(
                e => _mapper.Map<Group, GroupResponse>(e)
            ).ToList();
        }

        public async Task<IEnumerable<GroupResponse>> GetEnumerableByOwnerId(string ownerId)
        {
            var collection = await _repository.GetCollectionByOwnerId(ownerId);

            return collection.Select(
                e => _mapper.Map<Group, GroupResponse>(e)
            ).ToList();
        }
    }
}