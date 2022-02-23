using System;
using System.Threading.Tasks;
using LetSkole.Entities.Indentity;
using Microsoft.AspNetCore.Identity;

namespace LetSkole.DataAccess.Implementations
{
    public class UserRepository : IUserRepository
    {
        private readonly LetSkoleDbContext _context;

        public UserRepository(LetSkoleDbContext context)
        {
            _context = context;
        }

        public async Task Create(
            ApplicationUser entity,
            UserManager<ApplicationUser> userManager,
            string password,
            string role
        )
        {
            await using var transaction = await _context.Database.BeginTransactionAsync();
            try
            {
                var result = await userManager.CreateAsync(entity, password);
                if (!result.Succeeded)
                    throw new Exception(result.ToString());
                await _context.SaveChangesAsync();
                result = await userManager.AddToRoleAsync(entity, role);
                if (!result.Succeeded)
                    throw new Exception(result.ToString());
                await _context.SaveChangesAsync();

                await transaction.CommitAsync();
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
        }

        public async Task SaveChanges()
        {
            await _context.SaveChangesAsync();
        }
    }
}