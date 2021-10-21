using System;
using System.Collections.Generic;
using System.Text;
using LetSkole.Dto;

namespace LetSkole.Services
{
    public interface IGroupService
    {
        ICollection<GroupDto> GetCollection(string filter);
        GroupDto GetItem(int id);
        ICollection<GroupDto> GetCollectionByTeacherId (int userId);

        //Deberia retornar un GroupDto
        void Create (int userId, GroupDto entity);
        void Update(GroupDto entity, int userId);
        void Delete(int id, int userId);

    }
}
