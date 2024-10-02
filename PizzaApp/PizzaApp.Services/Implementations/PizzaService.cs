using AutoMapper;
using PizzaApp.DataAccess.Repositories.Abstractions;
using PizzaApp.Domain.Entities;
using PizzaApp.Dtos.PizzaDtos;
using PizzaApp.Services.Abstractions;
using PizzaApp.Shared.CustomExceptions.PizzaExceptions;
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

        public async Task<CustomResponse<PizzaDto>> CreatePizza(string userId, AddPizzaDto addPizzaDto)
        {
            try
            {
                var pizza = _mapper.Map<Pizza>(addPizzaDto);
                pizza.UserId = addPizzaDto.UserId; // ???
                await _pizzaRepository.Add(pizza);
                var pizzaDtoResult = _mapper.Map<PizzaDto>(addPizzaDto);
                return new CustomResponse<PizzaDto>(pizzaDtoResult);

            }
            catch (PizzaDataException ex)
            {
                throw new PizzaDataException($"Unexpected error while adding new pizza {ex.Message}");
            }
        }

        public async Task<CustomResponse> DeletePizza(string userId, int pizzaId)
        {
            try
            {
                var pizza = await _pizzaRepository.GetByIdInt(pizzaId);
                //response/result pattern
                if (pizza == null)
                {
                    return new CustomResponse("Pizza not found!");
                }

                //exception pattern
                //if(pizza == null)
                //{
                //    throw new PizzaNotFoundException("Pizza not found!");
                //}

                if (pizza.UserId != userId)
                    return new CustomResponse("You do not  have permissions to delete this pizza!");

                await _pizzaRepository.Remove(pizza);
                return new CustomResponse() { IsSuccessfull = true };

            }
            catch (PizzaDataException ex)
            {
                throw new PizzaDataException($"Unexpected error while deleting the pizza: {ex.Message}");
            }
        }

        public async Task<CustomResponse<List<PizzaDto>>> GetAllPizzas()
        {
            try
            {
                var pizzas = await _pizzaRepository.GetAll();
                var pizzaDtos = _mapper.Map<List<PizzaDto>>(pizzas);
                return new CustomResponse<List<PizzaDto>>(pizzaDtos);
            }
            catch (PizzaDataException ex)
            {
                throw new PizzaDataException($"Unexpected error while getting all pizzas: {ex.Message}");
            }
        }

        public async Task<CustomResponse<PizzaDto>> GetPizzaById(int id)
        {
            try
            {
                var pizza = await _pizzaRepository.GetByIdInt(id);
                if (pizza == null) return new CustomResponse<PizzaDto>("Pizza not found");
                var pizzaDto = _mapper.Map<PizzaDto>(pizza);
                return new CustomResponse<PizzaDto>(pizzaDto);
            }
            catch (PizzaDataException ex)
            {
                throw new PizzaDataException($"Unexpected error while getting the pizza: {ex.Message}");
            }
        }

        public async Task<CustomResponse<PizzaDto>> UpdatePizza(string userId, int pizzaId, UpdatePizzaDto updatePizzaDto)
        {
            try
            {
                var pizza = await _pizzaRepository.GetByIdInt(pizzaId);
                if (pizza == null) return new CustomResponse<PizzaDto>("Pizza not found!");
                if (pizza.UserId != userId) return new CustomResponse<PizzaDto>("You dont have authorisation to update this pizza");
                _mapper.Map(updatePizzaDto, pizza);
                await _pizzaRepository.Update(pizza);
                var pizzaDtoResult = _mapper.Map<PizzaDto>(pizza);
                return new CustomResponse<PizzaDto>(pizzaDtoResult);
            }
            catch (PizzaDataException ex)
            {
                throw new PizzaDataException($"Unexpected error while updating the pizza: {ex.Message}");
            }
        }
    }
}
