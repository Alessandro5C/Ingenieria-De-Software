using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using LetSkole.Entities;
using Microsoft.EntityFrameworkCore;

namespace LetSkole.DataAccess
{
    public class UserRepository:IUserRepository
    {
        private readonly LetSkoleDbContext _context;

        public UserRepository(LetSkoleDbContext context)
        {
            _context = context;
        }
        
        public ICollection<User> GetCollection(string filter)
        {
            return _context.Users.Where(c => c.Name.Contains(filter))
                .ToList();
        }

        public User GetItem(int id)
        {
            return _context.Users.Find(id);
        }

        public void Create(User entity)
        {
            _context.Set<User>().Add(entity);
            _context.SaveChanges();
        }

        public void Update(User entity)
        {
            _context.Set<User>().Attach(entity);
            _context.Entry(entity).State = EntityState.Modified;
            _context.SaveChanges();
        }

        public void Delete(int id)
        {
            _context.Entry(new User
            {
                Id = id
            }).State = EntityState.Deleted;
            _context.SaveChanges();
        }
    }
}
