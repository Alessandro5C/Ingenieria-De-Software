using LetSkole.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace LetSkole.DataAccess
{
    public interface IGroupRepository
    {
        // Task<ICollection<Group>> GetCollection(string filter);
        // Task<ICollection<Group>> GetCollectionByTeacher(string userId);
        
        Task<Group> GetItem(int id); 
        Task Create(Group entity);
        Task Update(Group entity);
        Task Delete(int id);
        
        // Task<ICollection<Group>> GetCollectionByUser(string userId);
        Task<ICollection<Group>> GetCollectionByUserId(string userId);
        Task<ICollection<Group>> GetCollectionByOwnerId(string ownerId);
    }
}
