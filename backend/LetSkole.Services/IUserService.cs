using System.Collections.Generic;
using System.Threading.Tasks;
using LetSkole.Dto;
using LetSkole.Entities.Indentity;

namespace LetSkole.Services
{
    public interface IUserService
    {
        Task<AppUserProfileDto> GetItem (string id);
        Task<ApplicationUser> Create (ApplicationUser entity);
        Task Update (AppUserProfileDto entity);
        Task Delete (string id);
        Task<string> SearchNumTel (string id);

        Task<int> GetItemByEmail(string email);
    }
}