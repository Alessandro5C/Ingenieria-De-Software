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
    public class UserGroupService : IUserGroupService
    {
        private readonly IUserGroupRepository _repository;
        private readonly IMapper _mapper;

        public UserGroupService(
            IUserGroupRepository repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        public async Task<UxgResponse> Create(
            string ownerId, UxgRequestForPost model)
        {
            // RETRIEVE OBJECT HERE
            var user = await _repository.GetUserByEmail(model.UserEmail);
            if (user == null)
                throw new LetSkoleException(
                    "Email does not match any user", 404);

            // CHECK IF ALREADY CREATED
            var entity = await _repository
                .GetItemByIds(user.Id, model.GroupId);
            if (entity != null)
                throw new LetSkoleException(
                    "Bad Request: Already created", 400);

            // RETRIEVE OBJECT HERE
            var group = await _repository.GetGroupById(model.GroupId);
            if (group == null)
                throw new LetSkoleException(
                    "GroupId does not match any group", 404);

            // CREATE OBJECT HERE
            entity = new UserGroup
            {
                UserId = user.Id,
                GroupId = group.Id
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

            return _mapper.Map<UserGroup, UxgResponse>(entity);
        }

        public async Task Update(string ownerId, UxgRequestForPut model)
        {
            // RETRIEVE OBJECT HERE
            var entity = await _repository
                .GetItemByIds(model.UserId, model.GroupId);
            if (entity == null)
                throw new LetSkoleException(
                    "Keys do not match any user-group", 404);
            if (entity.Group.OwnerId != ownerId)
                throw new LetSkoleException(403);

            // VALIDATE DATA HERE
            var message = "Bad Request: Grade cannot be more than "
                          + entity.Group.MaxGrade;
            if (model.Grade > entity.Group.MaxGrade)
                throw new LetSkoleException(message, 400);
            message = "Bad Request: Grade cannot be negative";
            if (model.Grade < 0)
                throw new LetSkoleException(message, 400);

            // MODIFY DATA HERE
            entity.Grade = model.Grade;

            // REPOSITORY CALLS HERE
            try
            {
                await _repository.Update(entity);
            }
            catch (Exception e)
            {
                throw new LetSkoleException(e.Message, 400);
            }
        }

        public async Task Delete(string ownerId, string userId, int groupId)
        {
            // RETRIEVE OBJECT HERE
            const string message = "Keys do not match any user-group";
            var entity = await _repository.GetItemByIds(userId, groupId);
            if (entity == null) throw new LetSkoleException(message, 404);
            if (entity.Group.OwnerId != ownerId) throw new LetSkoleException(403);

            // REPOSITORY CALLS HERE
            await _repository.Delete(entity);
        }

        public async Task<IEnumerable<UxgResponse>> GetEnumerableByGroupId(int groupId)
        {
            var collection = await _repository.GetCollectionByGroupId(groupId);

            return collection.Select(
                e => _mapper.Map<UserGroup, UxgResponse>(e)
            ).ToList();
        }
    }
}