using LetSkole.Dto;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace LetSkole.Services
{
    public interface IGameService
    {
        Task<IEnumerable<GameResponse>> GetEnumerable();
    }
}