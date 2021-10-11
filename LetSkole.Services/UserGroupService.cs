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

        public void DeleteUsingGroup(int GroupId)
        {
            throw new NotImplementedException();
        }

        public void DeleteUsingUser(int UserId, int GroupId)
        {
            throw new NotImplementedException();
        }

        public ICollection<UserGroupDto> GetItems(int filter)
        {
            var Collection = _repository.GetItems(filter);
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
            throw new NotImplementedException();
        }
    }
}
