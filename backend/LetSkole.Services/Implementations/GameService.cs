using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using LetSkole.DataAccess;
using LetSkole.Dto;
using LetSkole.Entities;

namespace LetSkole.Services.Implementations
{
    public class GameService : IGameService
    {
        private readonly IGameRepository _repository;
        private readonly IMapper _mapper;

        public GameService(IGameRepository repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        public async Task<IEnumerable<GameResponse>> GetEnumerable()
        {
            var collection = await _repository.GetCollection();

            return collection.Select(
                e => _mapper.Map<Game, GameResponse>(e)
            ).ToList();
        }
    }
}