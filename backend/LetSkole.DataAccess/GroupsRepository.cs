using LetSkole.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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


        public async Task Create(Group entity)
        {
            _context.Set<Group>().Add(entity);
            await _context.SaveChangesAsync();
        }

        public async Task Delete(int id)
        {
            _context.Entry(new Group
            {
                Id = id
            }).State = EntityState.Deleted;
            await _context.SaveChangesAsync();
        }

        public async Task<ICollection<Group>> GetCollection(string filter)
        {
            return await _context.Groups.Where(c => c.Name.Contains(filter))
                .ToListAsync();
        }

        public async Task<ICollection<Group>> GetCollectionByTeacher(int userId)
        {
            var query = await _context.Groups.Join(_context.UserGroups, group => group.Id, userGroup => userGroup.GroupId, (group, userGroup) => new { PersonId = userGroup.UserId, Id = group.Id, Name = group.Name, Description = group.Description, maxGrade = group.MaxGrade })
                   .Where(person => person.PersonId == userId)
                   .Select(g => new Group{ Id = g.Id, Name = g.Name, Description = g.Description, MaxGrade = g.maxGrade }).ToListAsync();

            return query;        
        }

        public Task<ICollection<Group>> GetCollectionByUser(int userId)
        {

            throw new NotImplementedException();
        }

        public async Task<Group> GetItem(int id)
        {
            return await _context.Groups.FindAsync(id);
        }

        public async Task Update(Group entity)
        {
            _context.Set<Group>().Attach(entity);
            _context.Entry(entity).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

    }
}
