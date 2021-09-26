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

        public UserDto GetItem(int id)
        {
            User user = _repository.GetItem(id);
            UserDto userDto = new UserDto();

            userDto.Id = user.Id;
            userDto.Name = user.Name;
            userDto.Student = user.Student;
            userDto.School = user.School;
            userDto.Email = user.Email;
            userDto.NumTelf = user.NumTelf;

            return userDto;
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

        public void Update(UserDto entity)
        {
            User user = _repository.GetItem(entity.Id);

            user.Name = entity.Name;
            user.Student = entity.Student;
            user.School = entity.School;
            user.Email = entity.Email;
            user.NumTelf = entity.NumTelf;

            _repository.Update(user);

        }

        public void Delete(int id)
        {
            _repository.Delete(id);
        }
    }
}