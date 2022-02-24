using LetSkole.Dto;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace LetSkole.Services
{
    public interface IUserGroupService
    {
        /// <param name="ownerId">Alias for AppUserId, should be handled by the server.</param>
        Task<UxgResponse> Create(
            string ownerId, UxgRequestForPost model);

        /// <param name="ownerId">Alias for AppUserId, should be handled by the server.</param>
        Task Update(string ownerId, UxgRequestForPut model);

        /// <param name="ownerId">Alias for AppUserId, should be handled by the server.</param>
        Task Delete(string ownerId, string userId, int groupId);

        Task<IEnumerable<UxgResponse>> GetEnumerableByGroupId(int groupId);
    }
}