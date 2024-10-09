using PizzaApp.Dtos.PizzaDtos;
using PizzaApp.Dtos.UserDtos;

namespace PizzaApp.Dtos.OrderDtos
{
    public class OrderDto
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public string AddressTo { get; set; }
        public string? Description { get; set; }
        public int OrderPrice {  get; set; }
        public List<PizzaDto>? Pizzas { get; set; }
        public UserOrderDto? User { get; set; }
    }
}
