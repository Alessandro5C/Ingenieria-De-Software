using System.Collections.Generic;
using System.Threading.Tasks;
using LetSkole.Dto;
using LetSkole.Entities.Indentity;

namespace LetSkole.Services
{
    public interface IUserService
    {
        /// <param name="id">AppUserId of the row you're attempting to retrieve.</param>
        Task<AppUserResponse> GetItemById (string id);
        
        Task<AppUserResponse> Create (AppUserRequestForPost model);
        
        /// <param name="id">Alias for AppUserId, should be handled by the server.</param>
        Task Update (string id, AppUserRequestForPut model);
    }
}