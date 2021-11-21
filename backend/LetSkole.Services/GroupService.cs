using LetSkole.DataAccess;
using LetSkole.Dto;
using LetSkole.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Linq;
using System.Collections;
using System.Threading.Tasks;

namespace LetSkole.Services
{
    public class GroupService : IGroupService
    {
        private readonly IGroupsRepository _repository;
        private readonly IUserRepository _userRepository;
        private readonly IUserGroupRepository _userGroupRepository;

        public GroupService(IGroupsRepository repository, IUserRepository userRepository, IUserGroupRepository userGroupRepository)
        {
            _repository = repository;
            _userRepository = userRepository;
            _userGroupRepository = userGroupRepository;
        }

        public async Task Create(int userId, GroupDto entity)
        {
            // Validar que exista el profesor
            User user = await _userRepository.GetItem(userId);

            if(user == null)
            {
                throw new Exception("User doesn't exist");
            }
            if(user.Student == true)
            {
                throw new Exception("Students cannot create a group");
            }
            Group group = new Group
            {
                Name = entity.Name,
                Description = entity.Description,
                MaxGrade = entity.MaxGrade
            };

            await _repository.Create(group);

            UserGroup userGroup = new UserGroup {
                GroupId = group.Id,
                UserId = user.Id,
                Grade = -1,
                Admin = true
            };
            await _userGroupRepository.Create(userGroup);
        }

        public async Task Delete(int id)
        { 
            await _repository.Delete(id);
        }

        public async Task<ICollection<GroupDto>> GetCollection(string filter)
        {
            var Collection = await _repository.GetCollection(filter ?? string.Empty);
            return Collection.Select(c => new GroupDto
            {
                Id = c.Id,
                Description = c.Description,
                Name = c.Name,
                MaxGrade = c.MaxGrade
            }).ToList();
        }

        public async Task<ICollection<GroupDto>> GetCollectionByTeacherId (int userId)
        {
            User user = await _userRepository.GetItem(userId);

            if (user == null)
            {
                throw new Exception("User doesn't exist");
            }
            //if (user.Student == true)
            //{
            //    throw new Exception("Students get groups");
            //}

            var collectionTeacher =  await _repository.GetCollectionByTeacher(userId);
            return collectionTeacher.Select(c => new GroupDto
            {   Id = c.Id,
                Description = c.Description,
                Name = c.Name,
                MaxGrade = c.MaxGrade
            }).ToList();
        }

        public async Task<GroupDto> GetItem(int id)
        {
            Group group = await _repository.GetItem(id);
            GroupDto groupDto = new GroupDto();
            groupDto.Id = group.Id;
            groupDto.Name = group.Name;
            groupDto.Description = group.Description;
            groupDto.MaxGrade = group.MaxGrade;
            return groupDto;
        }

        public async Task Update(GroupDto entity, int userId)
        {
            
            Group group = await _repository.GetItem(entity.Id);

            User auxUser = _userRepository.GetItem(userId).Result;
            var auxGroupsTeacher = await _repository.GetCollectionByTeacher(userId);
           
            Group auxGroup = new Group { Id = entity.Id };
            bool contenedor = auxGroupsTeacher.Contains(group);

            if (contenedor == false)
            {
                throw new LetSkoleException("User " + userId + " can't edit this group");
            }

            if (group == null)
            {
                throw new NullReferenceException("The group doesn't exists");
            }


            group.Name = entity.Name;
            group.Description = entity.Description;
            //group.MaxGrade = entity.MaxGrade;
            await _repository.Update(group);
        }
    }
}