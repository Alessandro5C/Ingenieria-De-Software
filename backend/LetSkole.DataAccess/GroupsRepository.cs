using LetSkole.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace LetSkole.DataAccess
{
    public class GroupsRepository : IGroupsRepository
    {

        private readonly LetSkoleDbContext _context;

        
        public GroupsRepository(LetSkoleDbContext context)
        {
            //Representa mi base de datos
            _context = context;
        }


        public void Create(Group entity)
        {
            _context.Set<Group>().Add(entity);
            _context.SaveChanges();
        }

        public void Delete(int id)
        {
            _context.Entry(new Group
            {
                Id = id
            }).State = EntityState.Deleted;
            //Falta encontrar el Group
            //_context.Groups.Remove();
            _context.SaveChanges();
        }

        public ICollection<Group> GetCollection(string filter)
        {
            return _context.Groups.Where(c => c.Name.Contains(filter))
                .ToList();
        }

        public Group GetItem(int id)
        {
            return _context.Groups.Find(id);
        }

        public void Update(Group entity)
        {
            _context.Set<Group>().Attach(entity);
            _context.Entry(entity).State = EntityState.Modified;
            _context.SaveChanges();
        }
    }
}
