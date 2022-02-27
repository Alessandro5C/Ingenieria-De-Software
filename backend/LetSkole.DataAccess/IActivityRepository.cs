using LetSkole.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace LetSkole.DataAccess
{
    public interface IActivityRepository
    {
        Task<Activity> GetItemById(int id);
        Task Create(Activity entity);
        Task Update(Activity entity);
        Task Delete(Activity entity);

        Task<ICollection<Activity>> GetCollectionByUserId(string userId);
    }
}
