using LetSkole.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LetSkole.DataAccess
{
    public class GameRepository : IGameRepository
    {
        private readonly LetSkoleDbContext _context;

        public GameRepository(LetSkoleDbContext context)
        {
            _context = context;
        }

        public async Task<ICollection<Game>> GetCollection(string filter)
        {
            return await _context.Games.Where(c => c.Name.Contains(filter))
                 .ToListAsync();
        }

        public async Task<Game> GetItem(int id) =>
            await _context.Games
            .SingleOrDefaultAsync(c => c.Id.Equals(id));
    }
}
