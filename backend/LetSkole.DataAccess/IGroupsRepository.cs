using LetSkole.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace LetSkole.DataAccess
{
    public interface IGroupsRepository
    {
        Task<ICollection<Group>> GetCollection(string filter);
        Task<ICollection<Group>> GetCollectionByTeacher(int userId);
        Task<Group> GetItem(int id); 
        Task Create(Group entity);
        Task Update(Group entity);
        Task Delete(int id);
    }
}
