using PizzaApp.Domain.Enums;

namespace PizzaApp.Dtos.PizzaDtos
{
    public class UpdatePizzaDto
    {
        public string Name { get; set; }
        public string? Description { get; set; }
        public int Price { get; set; }
        public List<IngredientsEnum> Ingredients { get; set; }
        public int? OrderId { get; set; }
    }
}
