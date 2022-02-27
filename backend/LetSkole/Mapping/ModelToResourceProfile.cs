using AutoMapper;
using LetSkole.Dto;
using LetSkole.Entities;
using LetSkole.Entities.Indentity;

namespace LetSkole.Mapping
{
    public class ModelToResourceProfile : Profile
    {
        // ENTITY to DTO
        public ModelToResourceProfile()
        {
            CreateMap<ApplicationUser, AppUserResponse>();
            CreateMap<Group, GroupResponse>();
            CreateMap<UserGroup, UxgResponse>();
            CreateMap<Game, GameResponse>();
            CreateMap<Reward, RewardResponse>();
            CreateMap<RewardUser, RxuResponse>();
            CreateMap<Activity, ActivityResponse>();
        }
    }
}