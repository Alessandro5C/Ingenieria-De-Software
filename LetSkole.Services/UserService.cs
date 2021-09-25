using System.Collections.Generic;
using System.Linq;
using LetSkole.DataAccess;
using LetSkole.Dto;
using LetSkole.Entities;

namespace LetSkole.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _repository;

        public UserService(IUserRepository repository)
        {
            _repository = repository;
        }
        
        public ICollection<UserDto> GetCollection(string filter)
        {
            var Collection = _repository.GetCollection(filter ?? string.Empty);
            return Collection.Select(c => new UserDto
            {
                Id = c.Id,
                Name = c.Name,
                Student = c.Student,
                School = c.School,
                Email = c.Email,
                NumTelf = c.NumTelf
            }).ToList();
        }

        //Este de aqui también falta
        public UserDto GetItem(int id)
        {
            throw new System.NotImplementedException();
        }

        public void Create(UserDto entity)
        {
            _repository.Create(new User
            {
                Name = entity.Name,
                Birthday = entity.Birthday,
                Student = entity.Student,
                School = entity.School,
                Email = entity.Email,
                NumTelf = entity.NumTelf,
            });
        }

        //Faltan estas 2 de aqui
        public void Update(int id, UserDto entity)
        {
            throw new System.NotImplementedException();
        }

        public void Delete(int id)
        {
            throw new System.NotImplementedException();
        }
    }
}