using System.Collections.Generic;
using System.Threading.Tasks;
using LetSkole.Dto;

namespace LetSkole.Services
{
    public interface IGroupService
    {
        /// <param name="ownerId">Alias for AppUserId, should be handled by the server.</param>
        Task<GroupResponse> Create(string ownerId, GroupRequestForPost model);

        /// <param name="ownerId">Alias for AppUserId, should be handled by the server.</param>
        /// <param name="id">GroupId of the row you're attempting to modify.</param>
        Task Update(string ownerId, GroupRequestForPut model, int id);

        /// <param name="ownerId">Alias for AppUserId, should be handled by the server.</param>
        /// <param name="id">GroupId of the row you're attempting to delete.</param>
        Task Delete(string ownerId, int id);

        Task<IEnumerable<GroupResponse>> GetEnumerableByUserId(string userId);
        Task<IEnumerable<GroupResponse>> GetEnumerableByOwnerId(string ownerId);
    }
}
