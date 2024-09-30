using Microsoft.AspNetCore.Identity;

namespace PizzaApp.Domain.Entities
{
    public class User : IdentityUser
    {
        public bool FirstLogin { get; set; }
        public List<Order> Orders { get; set; } = new List<Order>();
        public List<Pizza> Pizzas { get; set; } = new List<Pizza>();
    }
}
