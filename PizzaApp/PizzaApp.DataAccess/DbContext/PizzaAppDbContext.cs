using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using PizzaApp.Domain.Entities;

namespace PizzaApp.DataAccess.DbContext
{
    public class PizzaAppDbContext : IdentityDbContext<User>
    {
        public PizzaAppDbContext(DbContextOptions options) : base(options) 
        {
            //Database.EnsureDeleted();
            //Database.EnsureCreated();
        }

        //ova ke kreira tabela Pizzas vo nashata databaza
        //public DbSet<Pizza> Pizzas { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);  
        }
    }
}
