using LetSkole.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace LetSkole.DataAccess
{
   public interface IGameRepository
    {
        ICollection<Game> GetCollection(string filter);
        Game GetItem(int id);

    }
}
