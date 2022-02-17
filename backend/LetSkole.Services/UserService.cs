using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Threading.Tasks;
using LetSkole.DataAccess;
using LetSkole.Dto;
using LetSkole.Entities;
using LetSkole.Entities.Indentity;

namespace LetSkole.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _repository;

        public UserService(IUserRepository repository)
        {
            _repository = repository;
        }
        
        public async Task<ICollection<ApplicationUserDto>> GetCollection(string filter)
        {
            throw new NotImplementedException();
            // var Collection = await _repository.GetCollection(filter ?? string.Empty);
            // return Collection.Select(c => new UserDto
            // {   
            //     Id = c.Id,
            //     Name = c.UserName,
            //     Student = c.Student,
            //     School = c.School,
            //     Email = c.Email,
            //     NumTelf = c.PhoneNumber,
            //     Birthday=c.Birthday
            // }).ToList();
        }

        public async Task<ApplicationUserDto> GetItem(string id)
        {
            throw new NotImplementedException();
            // User user = await _repository.GetItem(id);
            // if(user == null)
            // {
            //     throw new NullReferenceException("No User exist with id " + id.ToString());
            // }
            //
            // UserDto userDto = new UserDto();
            //
            // userDto.Id = user.Id;
            // userDto.Name = user.Name;
            // userDto.Student = user.Student;
            // userDto.School = user.School;
            // userDto.Email = user.Email;
            // userDto.NumTelf = user.NumTelf;
            // userDto.Birthday = user.Birthday;
            //
            // return userDto;
        }

        public async Task<ApplicationUser> Create (ApplicationUser entity)
        {
            throw new NotImplementedException();
            // if (entity.Birthday == null)
            // {
            //     throw new LetSkoleException("It is neccesary to add a birthday");
            // }
            //
            // if (entity.Name == "" || entity.Name == null)
            // {
            //     throw new LetSkoleException("It is neccesary to add a name");
            // }
            //
            // if (string.IsNullOrEmpty(entity.Email))
            // {
            //     throw new LetSkoleException("It is neccesary to add email");
            // }
            // try
            // {
            //     var correo = new MailAddress(entity.Email);
            //     entity.Email = correo.Address;
            // }
            // catch
            // {
            //     throw new LetSkoleException("Email invalid");
            // }
            //
            // try
            // {
            //     int i = Convert.ToInt32(entity.PhoneNumber);
            // }
            // catch
            // {
            //     throw new LetSkoleException("Phone number invalid");
            // }
            //
            // await _repository.Create(entity);
            //
            // return entity;
        }

        public async Task Update(ApplicationUserDto entity)
        {
            throw new NotImplementedException();
            //
            // ApplicationUser user = await _repository.GetItem(entity.Id);
            //
            // if(user == null)
            // {
            //     throw new NullReferenceException("No User exist with id " + entity.Id.ToString());
            // }
            //
            // user.Name = entity.Name;
            // user.Student = entity.Student;
            // user.School = entity.School;
            // user.Email = entity.Email;
            // user.NumTelf = entity.NumTelf;
            //
            // await _repository.Update(user);
        }

        public async Task Delete(string id)
        {
            throw new NotImplementedException();
            // try
            // {
            //     await _repository.Delete(id);
            //  
            // } catch (Exception e)
            // {
            //     throw new NullReferenceException("Error deleting user id " + id.ToString());
            // }
        }

        public async Task<string> SearchNumTel(string id)
        {
            throw new NotImplementedException();
            //
            // string Numtel = await _repository.SearchNumTel(id);
            // if (Numtel == null){
            //     throw new NullReferenceException("Phone number invalid, user id " + id.ToString());
            // }
            //
            // return Numtel;
        }

        public async Task<int> GetItemByEmail(string email)
        {
            throw new NotImplementedException();
            //
            // User user = await _repository.GetItemByEmail(email);
            // if(user == null)
            // {
            //     throw new KeyNotFoundException("Todavia no existe 'User' registrado con email: " + email);
            // }
            // return user.Id;
        }
    }
}