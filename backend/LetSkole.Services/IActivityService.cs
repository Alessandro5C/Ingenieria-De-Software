using LetSkole.Dto;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace LetSkole.Services
{
    public interface IActivityService
    {
        Task <ICollection<ActivityDto>> GetCollection(string filter);
        Task <ActivityDto> GetItem(int id);
        Task Create(ActivityDto entity);
        Task Update(ActivityDto entity);
        Task Delete(int id);
    }
}

