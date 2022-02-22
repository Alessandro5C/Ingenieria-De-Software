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
            CreateMap<AppUserResponse, ApplicationUser>();
            CreateMap<GroupRequestForPost, Group>();
            CreateMap<GroupResponse, Group>();
        }
    }
}
