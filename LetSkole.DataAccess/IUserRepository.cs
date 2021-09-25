using System;
using System.Collections.Generic;
using System.Text;
using LetSkole.Entities;

namespace LetSkole.DataAccess
{
    public interface IUserRepository
    {
       ICollection<User> GetCollection (string filter);
        User GetItem (int id);
        void Create (User entity);
        void Update (User entity);
        void Delete (int id); 
    }
}
