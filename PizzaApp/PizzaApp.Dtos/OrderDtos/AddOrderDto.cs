using PizzaApp.Dtos.PizzaDtos;

namespace PizzaApp.Dtos.OrderDtos
{
    public class AddOrderDto
    {
        //public string UserId { get; set; } // ne ni treba veke i ne e dobar pristap od ovde da se zeme id na user
        public string AddressTo { get; set; }
        public string? Description { get; set; }
        public int OrderPrice {  get; set; }
        public List<AddPizzaDto> Pizzas { get; set; }
    }
}
