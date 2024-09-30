using PizzaApp.Domain.Entities;
using System.Text.Json.Serialization;

namespace PizzaApp.Dtos.OrderDtos
{
    public class UpdateOrderDto
    {
        [JsonIgnore]
        public int Id { get; set; }
        [JsonIgnore]
        public string UserId { get; set; }
        public string AddressTo { get; set; }
        public string? Description {  get; set; }
        public int OrderPrice { get; set; }
        public List<Pizza> Pizzas { get; set; }
    }
}
