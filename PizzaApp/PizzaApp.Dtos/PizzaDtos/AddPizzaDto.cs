using PizzaApp.Domain.Enums;

namespace PizzaApp.Dtos.PizzaDtos
{
    public class AddPizzaDto
    {
        public string Name { get; set; }
        public string? Description { get; set; }
        public int Price { get; set; }
        //public string UserId { get; set; } // ne ni treba veke bidejki go zimame od claimot vo PizzaController
        public List<IngredientsEnum> Ingredients { get; set; }
    }
}
