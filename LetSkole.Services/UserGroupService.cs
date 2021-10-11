using LetSkole.DataAccess;
using LetSkole.Dto;
using LetSkole.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace LetSkole.Services
{
    public class UserGroupService : IUserGroupService
    {
        private readonly IUserGroupRepository _repository;
        private readonly IGroupsRepository _groupsRepository;

        public UserGroupService(IUserGroupRepository repository, IGroupsRepository groupsRepository)
        {
            _repository = repository;
            _groupsRepository = groupsRepository;
        }

        public void Create(UserGroupDto entity)
        {
            int adminAux;
            if (entity.Admin == true){
                adminAux = 1;
            }
            else
            {
                adminAux = 0;
            }
            _repository.Create(new UserGroup
            {
                UserId = entity.UserId, 
                GroupId = entity.GroupId,
                Grade = -1,
                Admin = entity.Admin,
            });
        }

        public void DeleteUsingGroup(int groupId)
        {
            //Todavia no va
            throw new NotImplementedException();
        }

        public void DeleteUsingUser(int userId, int groupId)
        {
            _repository.DeleteUsingUser(userId, groupId);
            throw new NotImplementedException();
        }

        public ICollection<UserGroupDto> GetItems(int filter)
        {
            var collection = _repository.GetItems(filter);
            return collection.Select(c => new UserGroupDto
            {
                UserId = c.UserId,
                GroupId = c.GroupId,
                Admin = c.Admin,
                Grade = c.Grade
            }).ToList();
        }

        public void Update(UserGroupDto entity)
        {
            Group @group = _groupsRepository.GetItem(entity.GroupId);
            UserGroup userGroup = _repository.GetItem(entity.UserId, entity.GroupId);

            if (entity.Grade <= group.MaxGrade)
            {
                userGroup.Grade = entity.Grade;
            }
            else
            {
                throw new Exception("La nota ingresada es mayor a lo permitido.");
            }

            _repository.Update(userGroup);
        }
    }
}
