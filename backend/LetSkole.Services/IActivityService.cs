using LetSkole.Dto;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace LetSkole.Services
{
    public interface IActivityService
    {
        /// <param name="userId">Alias for AppUserId, should be handled by the server.</param>
        Task<ActivityResponse> Create (string userId, ActivityRequestForPost model);
        /// <param name="userId">Alias for AppUserId, should be handled by the server.</param>
        Task Update(string userId, ActivityRequestForPut model, int id);
        /// <param name="userId">Alias for AppUserId, should be handled by the server.</param>
        /// <param name="id">ActivityId of the row you're attempting to delete.</param>
        Task Delete(string userId, int id);

        Task<IEnumerable<ActivityResponse>> GetEnumerableByUserId(string userId);
    }
}

