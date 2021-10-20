using LetSkole.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace LetSkole.DataAccess
{
    public class GameRepository : IGameRepository
    {
        private readonly LetSkoleDbContext _context;

        public GameRepository(LetSkoleDbContext context)
        {
            _context = context;
        }

        public ICollection<Game> GetCollection(string filter)
        {
            return _context.Games.Where(c => c.Name.Contains(filter))
                .ToList();
        }

        public Game GetItem(int id)
        {
            return _context.Games.Find(id);
        }
    }
}
