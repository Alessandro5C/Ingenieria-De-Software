using AutoMapper;
using LetSkole.Dto;
using LetSkole.Entities;

namespace LetSkole.Mapping
{
    public class ResourceToModelProfile : Profile
    {
        // DTO to ENTITY
        public ResourceToModelProfile()
        {
            CreateMap<UserDto, User>();
            // CreateMap<SaveCostoResource, Costo>();
            // CreateMap<SaveCostosOperacionResource, CostosOperacion>();
            // CreateMap<SaveLetraResource, Letra>();
            // CreateMap<SaveOperacionResource, Operacion>();
            // CreateMap<SavePerfilResource, Perfil>();
            // CreateMap<SavePeriodoResource, Periodo>();
            // CreateMap<SaveTasaResource, Tasa>();
            // CreateMap<SaveUsuarioResource, Usuario>();
            // CreateMap<RegisterRequest, Usuario>();
        }
    }
}
