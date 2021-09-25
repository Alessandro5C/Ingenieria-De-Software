using LetSkole.Entities;
using System;
using System.Collections.Generic;
using System.Text;


namespace LetSkole.DataAccess
{
    public interface IGroupsRepository
    {
        ICollection<Group> GetCollection(string filter);

        Group GetItem(int id);

        void Create(Group entity);

        void Update(Group entity);
        void Delete(int id);
    }
}
