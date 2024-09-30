using PizzaApp.Dtos.PizzaDtos;
using PizzaApp.Shared.Responses;

namespace PizzaApp.Services.Abstractions
{
    public interface IPizzaService
    {
        Task<CustomResponse<List<PizzaDto>>> GetAllPizzas();
        Task<CustomResponse<PizzaDto>> GetPizzaById(int id);
        Task<CustomResponse<PizzaDto>> CreatePizza(string userId, AddPizzaDto addPizzaDto);
        Task<CustomResponse<PizzaDto>> UpdatePizza(string userId, int pizzaId, UpdatePizzaDto updatePizzaDto);
        Task<CustomResponse> DeletePizza(string userId, int pizzaId);
    }
}
