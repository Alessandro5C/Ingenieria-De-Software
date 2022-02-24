using System.Threading.Tasks;
using LetSkole.Entities.Indentity;
using Microsoft.AspNetCore.Identity;

namespace LetSkole.DataAccess
{
    public interface IUserRepository
    {
        public Task Create(
            ApplicationUser entity,
            UserManager<ApplicationUser> userManager,
            string password,
            string role
        );

        Task SaveChanges();
    }
}