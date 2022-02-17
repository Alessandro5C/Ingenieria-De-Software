using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using LetSkole.Entities.Indentity;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace LetSkole.DataAccess
{
    public class UserRepository : IUserRepository
    {
        // private readonly LetSkoleDbContext _context;
        // private readonly UserManager<ApplicationUser> _userManager;
        
        public UserRepository() { }
        
        // public UserRepository(UserManager<ApplicationUser> userManager)
        // {
        //     _userManager = userManager;
        // }
        
        // public UserRepository(LetSkoleDbContext context)
        // {
        //     _context = context;
        // }

        public async Task<ICollection<ApplicationUser>> GetCollection(string filter)
        {
            throw new NotImplementedException();
            // return await _userManager.Users
            //     .Where(c => c.UserName.Contains(filter))
            //     .ToListAsync();
            
            // return await _context.Users.Where(c => c.Name.Contains(filter))
            //     .ToListAsync();
        }
        
        public async Task<ApplicationUser> GetItem(string id)
        {
            throw new NotImplementedException();
            // return await _userManager.FindByIdAsync(id);
            
            // return await _context.Users.FindAsync(id);
        }

        public async Task Create(ApplicationUser entity, string password)
        {
            throw new NotImplementedException();
            // var result = await _userManager.CreateAsync(entity, password);
            // await _context.SaveChangesAsync();
            
            // _context.Set<ApplicationUser>().Add(entity);
            // await _context.SaveChangesAsync();
        }

        public async Task Update(ApplicationUser entity)
        {
            throw new NotImplementedException();
            // _context.Set<ApplicationUser>().Attach(entity);
            // _context.Entry(entity).State = EntityState.Modified;
            // await _context.SaveChangesAsync();
        }

        public async Task Delete(int id)
        {
            throw new NotImplementedException();
            // _context.Entry(new ApplicationUser
            // {
            //     Id = id
            // }).State = EntityState.Deleted;
            // await _context.SaveChangesAsync();
        }

        public async Task<string> SearchNumTel(int userId)
        {
            throw new NotImplementedException();
            // ApplicationUser applicationUser = await _context.Users.SingleOrDefaultAsync(c => c.Id.Equals(userId));
            // string NumTel = applicationUser.NumTelf;
            // return NumTel;
        }

        public async Task<ApplicationUser> GetItemByEmail(string email)
        {
            throw new NotImplementedException();
            // return await _context.Users.FirstAsync(c => c.Email.Contains(email));
        }
    }
}
