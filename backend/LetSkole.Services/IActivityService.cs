using LetSkole.Dto;
using System;
using System.Collections.Generic;
using System.Text;

namespace LetSkole.Services
{
    public interface IActivityService
    {
        ICollection<ActivityDto> GetCollection(string filter);
        ActivityDto GetItem(int id);
        void Create(ActivityDto entity);
        void Update(ActivityDto entity);
        void Delete(int id);
    }
}

