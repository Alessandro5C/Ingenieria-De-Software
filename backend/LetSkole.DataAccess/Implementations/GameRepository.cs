using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using LetSkole.Entities;
using Microsoft.EntityFrameworkCore;

namespace LetSkole.DataAccess.Implementations
{
    public class GameRepository : IGameRepository
    {
        private readonly LetSkoleDbContext _context;

        public GameRepository(LetSkoleDbContext context)
        {
            _context = context;
        }

        public async Task<ICollection<Game>> GetCollection()
        {
            return await (
                from g in _context.Games
                select g
            ).ToListAsync();
        }
    }
}