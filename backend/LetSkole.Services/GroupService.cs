using LetSkole.DataAccess;
using LetSkole.Dto;
using LetSkole.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Linq;
using System.Collections;

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

        public void Create(int userId, GroupDto entity)
        {
            // Validar que exista el profesor
            User user = _userRepository.GetItem(userId);

            if(user == null)
            {
                throw new Exception("User no existe");
            }
            if(user.Student == true)
            {
                throw new Exception("Los estudiantes no pueden crear grupo");
            }
            Group group = new Group
            {
                Name = entity.Name,
                Description = entity.Description,
                MaxGrade = entity.MaxGrade
            };

            _repository.Create(group);

            UserGroup userGroup = new UserGroup {
                GroupId = group.Id,
                UserId = user.Id,
                Grade = -1,
                Admin = true
            };
            _userGroupRepository.Create(userGroup);
        }

        public void Delete(int id)
        {
            _repository.Delete(id);
        }

        public ICollection<GroupDto> GetCollection(string filter)
        {
            var Collection = _repository.GetCollection(filter ?? string.Empty);
            return Collection.Select(c => new GroupDto
            {
                Id = c.Id,
                Description = c.Description,
                Name = c.Name,
                MaxGrade = c.MaxGrade
            }).ToList();
        }

        public ICollection<GroupDto> GetCollectionByTeacherId (int userId)
        {
            User user = _userRepository.GetItem(userId);

            if (user == null)
            {
                throw new Exception("User no existe");
            }
            if (user.Student == true)
            {
                throw new Exception("Los estudiantes no pueden crear grupo");
            }

            // Error solucionado, el group retorna null de la base de datos
            ICollection<UserGroup> userGroup = _userGroupRepository.GetItemsByTeacherId(userId);

            // Manipulando el ICollection
            IEnumerator enumerator = userGroup.GetEnumerator();

            while (enumerator.MoveNext())
            {
                UserGroup u = (UserGroup)enumerator.Current;
                u.Group = _repository.GetItem(u.GroupId);
            }

            return userGroup.Select(c => new GroupDto
            {   Id = c.GroupId,
                Description = c.Group.Description,
                Name = c.Group.Name,
                MaxGrade = c.Group.MaxGrade
            }).ToList();
        }

        public GroupDto GetItem(int id)
        {
            Group group = _repository.GetItem(id);
            GroupDto groupDto = new GroupDto();
            groupDto.Id = group.Id;
            groupDto.Name = group.Name;
            groupDto.Description = group.Description;
            groupDto.MaxGrade = group.MaxGrade;
            return groupDto;
        }

        public void Update( GroupDto entity)
        {
            Group group = _repository.GetItem(entity.Id);
            group.Name = entity.Name;
            group.Description = entity.Description;
            //group.MaxGrade = entity.MaxGrade;
            _repository.Update(group);
        }
    }
}