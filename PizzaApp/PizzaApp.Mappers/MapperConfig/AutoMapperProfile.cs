using AutoMapper;
using PizzaApp.Domain.Entities;
using PizzaApp.Dtos.UserDtos;

namespace PizzaApp.Mappers.MapperConfig
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile() 
        {
            CreateMap<User, LoginUserRequestDto>().ReverseMap();
            CreateMap<User, RegisterUserRequestDto>().ReverseMap();
            CreateMap<User, UserDto>().ReverseMap();
            CreateMap<User, UpdateUserDto>().ReverseMap();
        }
    }
}
