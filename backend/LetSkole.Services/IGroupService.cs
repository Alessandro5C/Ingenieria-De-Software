using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using LetSkole.Dto;

namespace LetSkole.Services
{
    public interface IGroupService
    {
        // Task<ICollection<GroupDto>> GetCollection(string filter);
        //
        //Deberia retornar un GroupDto

        // Task<GroupDto> GetItem(int id);
        Task<GroupResponse> Create(GroupRequest model, string ownerId);
        Task Update(GroupRequest model, int id, string ownerId);
        Task Delete(int id);

        Task<IEnumerable<GroupResponse>> GetEnumerableByUserId(string userId);
        Task<IEnumerable<GroupResponse>> GetEnumerableByOwnerId(string ownerId);
    }
}
