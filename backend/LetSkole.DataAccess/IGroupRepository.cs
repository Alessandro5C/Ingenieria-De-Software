using LetSkole.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace LetSkole.DataAccess
{
    public interface IGroupRepository
    {
        Task<Group> GetItemById(int id); 
        Task Create(Group entity);
        Task Update(Group entity);
        Task Delete(Group entity);
        
        Task<ICollection<Group>> GetCollectionByUserId(string userId);
        Task<ICollection<Group>> GetCollectionByOwnerId(string ownerId);
    }
}
