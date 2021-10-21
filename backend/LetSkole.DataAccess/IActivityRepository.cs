using LetSkole.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace LetSkole.DataAccess
{
    public interface IActivityRepository
    {
        ICollection<Activity> GetActivities(string filter);
        Activity GetItem(int id);
        void Create(Activity entity);
        void Update(Activity entity);
        void Delete(int id);
    }
}
