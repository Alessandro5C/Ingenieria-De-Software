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
        void Create(int id, GroupDto entity);
        void Update(GroupDto entity);
        void Delete(int id);

    }
}
