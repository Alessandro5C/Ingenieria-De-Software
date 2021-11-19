using System.Collections.Generic;
using System.Threading.Tasks;
using LetSkole.Dto;
using LetSkole.Entities;

namespace LetSkole.Services
{
    public interface IUserService
    {
        Task<ICollection<UserDto>> GetCollection (string filter);
        Task<UserDto> GetItem (int id);
        Task<User> Create (User entity);
        Task Update (UserDto entity);
        Task Delete (int id);
        Task<string> SearchNumTel (int userId);

        Task<int> GetItemByEmail(string email);
    }
}