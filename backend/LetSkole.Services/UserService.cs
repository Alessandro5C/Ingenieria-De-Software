using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Threading.Tasks;
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
        
        public async Task<ICollection<UserDto>> GetCollection(string filter)
        {
            var Collection = await _repository.GetCollection(filter ?? string.Empty);
            return Collection.Select(c => new UserDto
            {   
                Id = c.Id,
                Name = c.Name,
                Student = c.Student,
                School = c.School,
                Email = c.Email,
                NumTelf = c.NumTelf,
                Birthday=c.Birthday
            }).ToList();
        }

        public async Task<UserDto> GetItem(int id)
        {
            User user = await _repository.GetItem(id);
            if(user == null)
            {
                throw new NullReferenceException("No User exist with id " + id.ToString());
            }

            UserDto userDto = new UserDto();

            userDto.Id = user.Id;
            userDto.Name = user.Name;
            userDto.Student = user.Student;
            userDto.School = user.School;
            userDto.Email = user.Email;
            userDto.NumTelf = user.NumTelf;
            userDto.Birthday = user.Birthday;

            return userDto;
        }

        public async Task<User> Create (User entity)
        {
            if (entity.Birthday == null)
            {
                throw new LetSkoleException("It is neccesary to add a birthday");
            }

            if (entity.Name == "" || entity.Name == null)
            {
                throw new LetSkoleException("It is neccesary to add a name");
            }

            if (string.IsNullOrEmpty(entity.Email))
            {
                throw new LetSkoleException("It is neccesary to add email");
            }
            try
            {
                var correo = new MailAddress(entity.Email);
                entity.Email = correo.Address;
            }
            catch
            {
                throw new LetSkoleException("Email invalid");
            }

            try
            {
                int i = Convert.ToInt32(entity.NumTelf);
            }
            catch
            {
                throw new LetSkoleException("Phone number invalid");
            }
            
            await _repository.Create(entity);
            
            return entity;
        }

        public async Task Update(UserDto entity)
        {

            User user = await _repository.GetItem(entity.Id);
            
            if(user == null)
            {
                throw new NullReferenceException("No User exist with id " + entity.Id.ToString());
            }

            user.Name = entity.Name;
            user.Student = entity.Student;
            user.School = entity.School;
            user.Email = entity.Email;
            user.NumTelf = entity.NumTelf;

            await _repository.Update(user);
        }

        public async Task Delete(int id)
        {
            try
            {
                await _repository.Delete(id);
             
            } catch (Exception e)
            {
                throw new NullReferenceException("Error deleting user id " + id.ToString());
            }
        }

        public async Task<string> SearchNumTel(int userId)
        {

            string Numtel = await _repository.SearchNumTel(userId);
            if (Numtel == null){
                throw new NullReferenceException("Phone number invalid, user id " + userId.ToString());
            }

            return Numtel;
        }

        public async Task<int> GetItemByEmail(string email)
        {
            User user = await _repository.GetItemByEmail(email);
            if(user == null)
            {
                throw new KeyNotFoundException("Todavia no existe 'User' registrado con email: " + email);
            }
            return user.Id;
        }
    }
}