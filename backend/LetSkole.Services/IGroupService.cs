using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using LetSkole.Dto;

namespace LetSkole.Services
{
    public interface IGroupService
    {
        Task<ICollection<GroupDto>> GetCollection(string filter);
        Task<GroupDto> GetItem(int id);
        Task<ICollection<GroupDto>> GetCollectionByTeacherId (string userId);

        //Deberia retornar un GroupDto
        Task Create (string userId, GroupDto entity);
        Task Update(GroupDto entity, string userId);
        Task Delete(int id);

    }
}
