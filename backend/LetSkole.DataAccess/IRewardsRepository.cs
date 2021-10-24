using LetSkole.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace LetSkole.DataAccess
{
    public interface IRewardsRepository
    {
        Task <ICollection<Reward>> GetCollection(string filter);
        Task <Reward> GetItem(int id);
        Task Create(Reward entity);
        Task Update(Reward entity);
        Task Delete(int id);

    }
}
