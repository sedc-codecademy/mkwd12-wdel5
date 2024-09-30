using PizzaApp.Domain.Entities;

namespace PizzaApp.DataAccess.Repositories.Abstractions
{
    public interface IOrderRepository : IBaseRepository<Order>
    {
        Task<List<Order>> GetOrdersWithDetails();
    }
}
