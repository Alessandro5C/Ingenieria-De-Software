using LetSkole.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace LetSkole.DataAccess
{
    public interface IRewardsRepository
    {
        ICollection<Reward> GetCollection(string filter);
        Reward GetItem(int id);
        void Create(Reward entity);
        void Update(Reward entity);
        void Delete(int id);

    }
}
