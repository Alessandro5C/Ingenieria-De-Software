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
            CreateMap<ApplicationUser, AppUserProfileDto>();
            CreateMap<Group, GroupRequest>();
            CreateMap<Group, GroupResponse>();
        }
    }
}
