using PizzaApp.Domain.Enums;
using System.Text.Json.Serialization;

namespace PizzaApp.Domain.Entities
{
    public class Pizza
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string? Description { get; set; }
        public int Price { get; set; }
        public List<IngredientsEnum> Ingredients { get; set; } = new List<IngredientsEnum>();
        public string UserId { get; set; }
        public User User { get; set; }
        public int? OrderId { get; set; }
        [JsonIgnore]
        public Order Order { get; set; }
    }
}
