using System.Collections.Generic;
using System.Threading.Tasks;
using LetSkole.Dto;
using LetSkole.Entities.Indentity;

namespace LetSkole.Services
{
    public interface IUserService
    {
        Task<ICollection<ApplicationUserDto>> GetCollection (string filter);
        Task<ApplicationUserDto> GetItem (string id);
        Task<ApplicationUser> Create (ApplicationUser entity);
        Task Update (ApplicationUserDto entity);
        Task Delete (string id);
        Task<string> SearchNumTel (string id);

        Task<int> GetItemByEmail(string email);
    }
}