using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using LetSkole.Entities;
using Microsoft.EntityFrameworkCore;

namespace LetSkole.DataAccess
{
    public class UserRepository : IUserRepository
    {
        private readonly LetSkoleDbContext _context;

        public UserRepository(LetSkoleDbContext context)
        {
            _context = context;
        }

        public async Task<ICollection<User>> GetCollection (string filter)
        => await _context.Users.Where(c => c.Name.Contains(filter))
                .ToListAsync();
        
        public async Task<User> GetItem(int id)
        {
            User user = await _context.Users.FindAsync(id);
            return user;
        }

        public async Task Create(User entity)
        {
            _context.Set<User>().Add(entity);
            await _context.SaveChangesAsync();
        }

        public async Task Update(User entity)
        {
            _context.Set<User>().Attach(entity);
            _context.Entry(entity).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task Delete(int id)
        {
            _context.Entry(new User
            {
                Id = id
            }).State = EntityState.Deleted;
            await _context.SaveChangesAsync();
        }

        public async Task<string> SearchNumTel(int userId)
        {
            User user = await _context.Users.SingleOrDefaultAsync(c => c.Id.Equals(userId));
            string NumTel = user.NumTelf;
            return NumTel;
        }

    }
}
