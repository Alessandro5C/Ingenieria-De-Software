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
            CreateMap<ApplicationUser, ApplicationUserDto>();
            // CreateMap<User, UserDto>();
            // CreateMap<Costo, CostoResource>();
            // CreateMap<CostosOperacion, CostosOperacionResource>();
            // CreateMap<Letra, LetraResource>();
            // CreateMap<OperacionCartera, OperacionCarteraResource>();
            // CreateMap<OperacionLetra, OperacionLetraResource>();
            // CreateMap<Operacion, OperacionResource>();
            // CreateMap<Perfil, PerfilResource>();
            // CreateMap<Periodo, PeriodoResource>();
            // CreateMap<Tasa, TasaResource>();
            // CreateMap<Usuario, AuthenticationResponse>();
            // CreateMap<Usuario, UsuarioResource>();
        }
    }
}
