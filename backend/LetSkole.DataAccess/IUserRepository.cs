using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using LetSkole.Entities;
using LetSkole.Entities.Indentity;

namespace LetSkole.DataAccess
{
    public interface IUserRepository
    {
        Task<ICollection<ApplicationUser>> GetCollection (string filter);
        Task<ApplicationUser> GetItem (string id);
        Task Create (ApplicationUser entity, string password);
        Task Update (ApplicationUser entity);
        Task Delete (int id);
        Task<string> SearchNumTel(int userId);
        // for IDENTITY
        Task<ApplicationUser> GetItemByEmail(string email);

    }
}
