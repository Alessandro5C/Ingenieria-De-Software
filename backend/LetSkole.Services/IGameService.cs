using LetSkole.Dto;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace LetSkole.Services
{
    public interface IGameService
    {
        Task <ICollection<GameDto>> GetCollection(string filter);
        Task <GameDto> GetItem(int id);
     
    }
}
