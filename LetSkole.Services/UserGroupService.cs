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

        public UserGroupService(IUserGroupRepository repository)
        {
            _repository = repository;
        }

        public void Create(UserGroupDto entity)
        {
            //Aqui debemos ver quien cree el grupo sea un profesor
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
            throw new NotImplementedException();
        }

        public void DeleteUsingUser(int userId, int groupId)
        {
            _repository.DeleteUsingUser(userId, groupId);
        }

        public ICollection<UserGroupDto> GetItems(int groupId)
        {
            var Collection = _repository.GetItems(groupId);
            return Collection.Select(c => new UserGroupDto
            {
                UserId = c.UserId,
                GroupId = c.GroupId,
                Admin = c.Admin,
                Grade = c.Grade
            }).ToList();
        }

        public void Update(UserGroupDto entity)
        {
            UserGroup userGroup = _repository.GetItem(entity.UserId, entity.GroupId);

            if (0 <= entity.Grade && entity.Grade <= userGroup.Group.MaxGrade)
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
