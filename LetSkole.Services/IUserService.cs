using System.Collections.Generic;
using LetSkole.Dto;

namespace LetSkole.Services
{
    public interface IUserService
    {
        ICollection<UserDto> GetCollection (string filter);
        UserDto GetItem (int id);
        void Create (UserDto entity);
        void Update (int id, UserDto entity);
        void Delete (int id); 
    }
}