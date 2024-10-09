using Microsoft.EntityFrameworkCore;
using PizzaApp.DataAccess.DbContext;
using PizzaApp.DataAccess.Repositories.Abstractions;
using PizzaApp.Domain.Entities;

namespace PizzaApp.DataAccess.Repositories.Implementations
{
    public class OrderRepository : BaseRepository<Order>, IOrderRepository
    {
        private readonly PizzaAppDbContext _pizzaAppDbContext;

        public OrderRepository(PizzaAppDbContext pizzaAppDbContext) : base(pizzaAppDbContext)
        {
            _pizzaAppDbContext = pizzaAppDbContext;
        }

        public async Task<List<Order>> GetOrdersWithDetails()
        {
            var orders = await _pizzaAppDbContext.Order.Include(x => x.Pizzas)
                                                       .Include(u => u.User).ToListAsync();
            return orders;
        }
    }
}
