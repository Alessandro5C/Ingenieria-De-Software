using LetSkole.Dto;
using System;
using System.Collections.Generic;
using System.Text;

namespace LetSkole.Services
{
    public interface IGameService
    {
        ICollection<GameDto> GetCollection(string filter);
        GameDto GetItem(int id);
     
    }
}
