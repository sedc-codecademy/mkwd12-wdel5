using AutoMapper;
using PizzaApp.DataAccess.Repositories.Abstractions;
using PizzaApp.Dtos.PizzaDtos;
using PizzaApp.Services.Abstractions;
using PizzaApp.Shared.Responses;

namespace PizzaApp.Services.Implementations
{
    public class PizzaService : IPizzaService
    {
        private readonly IPizzaRepository _pizzaRepository;
        private readonly IMapper _mapper;

        public PizzaService(IPizzaRepository pizzaRepository, IMapper mapper)
        {
            _pizzaRepository = pizzaRepository;
            _mapper = mapper;
        }

        public Task<CustomResponse<PizzaDto>> CreatePizza(string userId, AddPizzaDto addPizzaDto)
        {
            throw new NotImplementedException();
        }

        public Task<CustomResponse> DeletePizza(string userId, int pizzaId)
        {
            throw new NotImplementedException();
        }

        public Task<CustomResponse<List<PizzaDto>>> GetAllPizzas()
        {
            throw new NotImplementedException();
        }

        public Task<CustomResponse<PizzaDto>> GetPizzaById(int id)
        {
            throw new NotImplementedException();
        }

        public Task<CustomResponse<PizzaDto>> UpdatePizza(string userId, int pizzaId, UpdatePizzaDto updatePizzaDto)
        {
            throw new NotImplementedException();
        }
    }
}
