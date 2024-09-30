using AutoMapper;
using PizzaApp.DataAccess.Repositories.Abstractions;
using PizzaApp.Dtos.OrderDtos;
using PizzaApp.Services.Abstractions;
using PizzaApp.Shared.Responses;

namespace PizzaApp.Services.Implementations
{
    public class OrderService : IOrderService
    {
        private readonly IOrderRepository _orderRepository;
        private readonly IMapper _mapper;

        public OrderService(IOrderRepository orderRepository, IMapper mapper)
        {
            _orderRepository = orderRepository;
            _mapper = mapper;
        }

        public Task<CustomResponse<OrderDto>> CreateOrder(string userId, AddOrderDto orderDto)
        {
            throw new NotImplementedException();
        }

        public Task<CustomResponse> DeleteOrder(string userId, int id)
        {
            throw new NotImplementedException();
        }

        public Task<CustomResponse<List<OrderDto>>> GetAllOrders()
        {
            throw new NotImplementedException();
        }

        public Task<CustomResponse<OrderDto>> GetOrderById(int id)
        {
            throw new NotImplementedException();
        }

        public Task<CustomResponse<OrderDto>> UpdateOrder(string userId, int orderId, UpdateOrderDto updateOrderDto)
        {
            throw new NotImplementedException();
        }
    }
}
