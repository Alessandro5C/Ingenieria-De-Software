using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using LetSkole.Entities;

namespace LetSkole.DataAccess
{
    public interface IUserRepository
    {
        Task<ICollection<User>> GetCollection (string filter);
        Task<User> GetItem (int id);
        Task Create (User entity);
        Task Update (User entity);
        Task Delete (int id);
        Task<string> SearchNumTel(int userId);

    }
}
