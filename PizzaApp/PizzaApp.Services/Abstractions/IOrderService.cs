using PizzaApp.Dtos.OrderDtos;
using PizzaApp.Shared.Responses;

namespace PizzaApp.Services.Abstractions
{
    public interface IOrderService
    {
        Task<CustomResponse<List<OrderDto>>> GetAllOrders();
        Task<CustomResponse<OrderDto>> GetOrderById(int id);
        Task<CustomResponse<OrderDto>> CreateOrder(string userId, AddOrderDto orderDto);
        Task<CustomResponse<OrderDto>> UpdateOrder(string userId, int orderId, UpdateOrderDto updateOrderDto);
        Task<CustomResponse> DeleteOrder(string userId, int id);
    }
}
