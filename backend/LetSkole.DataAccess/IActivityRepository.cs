using LetSkole.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace LetSkole.DataAccess
{
    public interface IActivityRepository
    {
        Task<ICollection<Activity>> GetActivities(string filter);
        Task<Activity> GetItem(int id);
        Task Create(Activity entity);
        Task Update(Activity entity);
        Task Delete(int id);

        Task<ICollection<Activity>> GetCollectionByID(int id);
    }
}
