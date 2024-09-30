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

        //Reprezentacija na tabelite od 
        public DbSet<Pizza> Pizza { get; set; }
        public DbSet<Order> Order { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            //TABLE RELATIONSHIPS
            // Order => user relationship
            builder.Entity<Order>()
                .HasOne(o => o.User)
                .WithMany(o => o.Orders)
                .HasForeignKey(o => o.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            // Pizza => User relationship
            builder.Entity<Pizza>()
                .HasOne(u => u.User)
                .WithMany(p => p.Pizzas)
                .HasForeignKey(p => p.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            // Order => Pizza
            builder.Entity<Order>()
                .HasMany(p => p.Pizzas)
                .WithOne(o => o.Order)
                .HasForeignKey(t => t.OrderId)
                .OnDelete(DeleteBehavior.Cascade);

            //ORDERS
            builder.Entity<Order>()
                .HasKey(k => k.Id);

            builder.Entity<Order>()
                .Property(a => a.AddressTo)
                .IsRequired()
                .HasMaxLength(50);

            builder.Entity<Order>()
                .Property(o => o.Description)
                .HasMaxLength(500);

            builder.Entity<Order>()
                .Property(o => o.OrderPrice)
                .IsRequired();

            //PIZZAS
            builder.Entity<Pizza>()
                .HasKey(k => k.Id);

            builder.Entity<Pizza>()
                .Property(n => n.Name)
                .IsRequired()
                .HasMaxLength(100);

            builder.Entity<Pizza>()
                .Property(i => i.Description)
                .HasMaxLength(500);

            builder.Entity<Pizza>()
                .Property(p => p.Price)
                .IsRequired();
        }
    }
}
