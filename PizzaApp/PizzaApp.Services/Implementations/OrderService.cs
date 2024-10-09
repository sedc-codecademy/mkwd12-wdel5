using AutoMapper;
using PizzaApp.DataAccess.Repositories.Abstractions;
using PizzaApp.Domain.Entities;
using PizzaApp.Dtos.OrderDtos;
using PizzaApp.Services.Abstractions;
using PizzaApp.Shared.CustomExceptions.OrderExceptions;
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

        public async Task<CustomResponse<OrderDto>> CreateOrder(string userId, AddOrderDto orderDto)
        {
            try
            {
                var order = _mapper.Map<Order>(orderDto);
                order.UserId = userId;
                foreach (var item in order.Pizzas)
                {
                    item.UserId = userId;
                }
                await _orderRepository.Add(order);
                var orderDtoResult = _mapper.Map<OrderDto>(order);
                return new CustomResponse<OrderDto>(orderDtoResult);
            }
            catch (OrderDataException ex)
            {
                throw new OrderDataException($"Unexpected error while creating the order {ex.Message}");
            }
        }

        public async Task<CustomResponse> DeleteOrder(string userId, int id)
        {
            try
            {
                var order = await _orderRepository.GetByIdInt(id);
                if (order == null) return new CustomResponse("Order not found!");
                if (order.UserId != userId) return new CustomResponse("You dont have permission to delete this order");
                await _orderRepository.Remove(order);
                return new CustomResponse() { IsSuccessfull = true };
            }
            catch (OrderDataException ex)
            {
                throw new OrderDataException($"Unexpected error while deleting the order {ex.Message}");
            }
        }

        public async Task<CustomResponse<List<OrderDto>>> GetAllOrders(bool IsOrderForUser)
        {
            try
            {
                var orders = new List<Order>();
                if (IsOrderForUser == true)
                     orders = await _orderRepository.GetOrdersWithDetails();
                 orders = await _orderRepository.GetAll();

                var orderDtos = _mapper.Map<List<OrderDto>>(orders);
                return new CustomResponse<List<OrderDto>>(orderDtos);
            }
            catch (OrderDataException ex)
            {
                throw new OrderDataException($"Unexpected error while getting all orders {ex.Message}");
            }
        }

        public async Task<CustomResponse<OrderDto>> GetOrderById(int id)
        {
            try
            {
                var order = await _orderRepository.GetByIdInt(id);
                if (order == null) return new CustomResponse<OrderDto>("Order not found!");
                var orderDto = _mapper.Map<OrderDto>(order);
                return new CustomResponse<OrderDto>(orderDto);
            }
            catch (OrderDataException ex)
            {
                throw new OrderDataException($"Unexpected error while getting the order {ex.Message}");
            }
        }

        public async Task<CustomResponse<OrderDto>> UpdateOrder(string userId, int orderId, UpdateOrderDto updateOrderDto)
        {
            try
            {
                var order = await _orderRepository.GetByIdInt(orderId);
                if (order == null) return new CustomResponse<OrderDto>("order not found");
                if (order.UserId != userId) return new CustomResponse<OrderDto>("you do not have permissions to update the order");
                var updatedOrder = _mapper.Map(updateOrderDto, order);
                updateOrderDto.UserId = userId;
                await _orderRepository.Update(updatedOrder);
                var orderDtoResult = _mapper.Map<OrderDto>(order);
                return new CustomResponse<OrderDto>() { IsSuccessfull = true, Result = orderDtoResult };
            }
            catch (OrderDataException ex)
            {
                throw new OrderDataException($"Unexpected error while updating the order {ex.Message}");
            }
        }
    }
}
