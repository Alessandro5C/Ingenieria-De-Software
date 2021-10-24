using LetSkole.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace LetSkole.DataAccess
{
   public interface IGameRepository
    {
        Task <ICollection<Game>> GetCollection(string filter);
        Task <Game> GetItem(int id);

    }
}
