using AutoMapper;
using PizzaApp.Domain.Entities;
using PizzaApp.Dtos.OrderDtos;
using PizzaApp.Dtos.PizzaDtos;
using PizzaApp.Dtos.UserDtos;

namespace PizzaApp.Mappers.MapperConfig
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile() 
        {
            //UserMappings
            CreateMap<User, LoginUserRequestDto>().ReverseMap();
            CreateMap<User, RegisterUserRequestDto>().ReverseMap();
            CreateMap<User, UserDto>().ReverseMap();
            CreateMap<User, UpdateUserDto>().ReverseMap();

            //PizzaMappings
            CreateMap<Pizza, PizzaDto>().ReverseMap();
            CreateMap<Pizza, AddPizzaDto>().ReverseMap();
            CreateMap<Pizza, UpdatePizzaDto>().ReverseMap();

            //OrderMappings
            CreateMap<Order, OrderDto>().ReverseMap();
            CreateMap<Order, AddOrderDto>().ReverseMap();
            CreateMap<Order, UpdateOrderDto>().ReverseMap();
        }
    }
}
