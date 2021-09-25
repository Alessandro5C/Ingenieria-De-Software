using LetSkole.DataAccess;
using LetSkole.Dto;
using LetSkole.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Linq;

namespace LetSkole.Services
{
    public class GroupService : IGroupService
    {
        private readonly IGroupsRepository _repository;

        public GroupService(IGroupsRepository repository)
        {
            _repository = repository;
        }

        public void Create(GroupDto entity)
        {
            _repository.Create(new Group
            {

                Name = entity.Name,
                Description = entity.Description,
            });
        }

        public void Delete(int id)
        {
            throw new NotImplementedException();
        }

        public ICollection<GroupDto> GetActivities(string filter)
        {
            var Collection = _repository.GetCollection(filter ?? string.Empty);
            return Collection.Select(c => new GroupDto
            {
                Description = c.Description,
                Name = c.Name,
                
            }).ToList();
        }

        public GroupDto GetItem(int id)
        {
             
            Group Tomas = _repository.GetItem(id);
            GroupDto Pastor = new GroupDto(); 
            Pastor.Id = Tomas.Id;
            Pastor.Name = Tomas.Name;
            Pastor.Description = Tomas.Description;
            return Pastor;
        }

        public void Update(int id, GroupDto entity)
        {
            throw new NotImplementedException();
        }
    }
}
