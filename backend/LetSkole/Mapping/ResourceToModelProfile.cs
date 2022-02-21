using AutoMapper;
using LetSkole.Dto;
using LetSkole.Entities;
using LetSkole.Entities.Indentity;

namespace LetSkole.Mapping
{
    public class ResourceToModelProfile : Profile
    {
        // DTO to ENTITY
        public ResourceToModelProfile()
        {
            CreateMap<AppUserProfileDto, ApplicationUser>();
            CreateMap<GroupRequest, Group>();
            CreateMap<GroupResponse, Group>();
        }
    }
}
