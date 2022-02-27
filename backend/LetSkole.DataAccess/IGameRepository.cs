using LetSkole.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace LetSkole.DataAccess
{
    public interface IGameRepository
    {
        Task<ICollection<Game>> GetCollection();
    }
}