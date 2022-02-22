using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using LetSkole.Dto;

namespace LetSkole.Services
{
    public interface IGroupService
    {
        Task<GroupResponse> Create(string ownerId, GroupRequestForPost model);
        Task Update(string ownerId, GroupRequestForPut model, int id);
        Task Delete(string ownerId, int id);

        Task<IEnumerable<GroupResponse>> GetEnumerableByUserId(string userId);
        Task<IEnumerable<GroupResponse>> GetEnumerableByOwnerId(string ownerId);
    }
}
