using LetSkole.DataAccess;
using LetSkole.Dto;
using LetSkole.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LetSkole.Services
{
    public class UserGroupService : IUserGroupService
    {
        private readonly IUserGroupRepository _repository;

        public UserGroupService(IUserGroupRepository repository)
        {
            _repository = repository;
        }

        public async Task Create(UserGroupDto entity)
        {
            try
            {
                //Aqui debemos ver quien cree el grupo sea un profesor
                await _repository.Create(new UserGroup
                {
                    ApplicationUserId = entity.UserId,
                    GroupId = entity.GroupId,
                    Grade = -1,
                    Admin = false,
                });
            }
            catch (Exception)
            {
                throw new LetSkoleException("Error creating user group");
            }
        }

        public async Task DeleteUsingGroup(int groupId)
        {
            throw new NotImplementedException();
        }

        public async Task DeleteUsingUser(string userId, int groupId)
        {
            _repository.DeleteUsingUser(userId, groupId);
        }

        public async Task<ICollection<UserGroupDto>> GetItems(int groupId)
        {
            var Collection = await _repository.GetItems(groupId);

            return Collection.Select(c => new UserGroupDto
            {
                UserId = c.ApplicationUserId,
                GroupId = c.GroupId,
                Admin = c.Admin,
                Grade = c.Grade
            }).ToList();
        }

        public async Task Update(UserGroupDto entity)
        {
            UserGroup userGroup = await _repository.GetItem(entity.UserId, entity.GroupId);

            if (0 <= entity.Grade && entity.Grade <= userGroup.Group.MaxGrade)
            {
                userGroup.Grade = entity.Grade;
            }
            else
            {
                throw new Exception("The grade you enter is more than the accepted");
            }
            
            await _repository.Update(userGroup);
        }
        public async Task<ICollection<UserGroupDto>> SearchGrade(string userId)
        {
            var Collection = await _repository.GetItemsByTeacherId(userId);
            return Collection.Select(c => new UserGroupDto
            {
                UserId = c.ApplicationUserId,
                GroupId = c.GroupId,
                Admin = c.Admin,
                Grade = c.Grade
            }).ToList();
        }
    }
}
