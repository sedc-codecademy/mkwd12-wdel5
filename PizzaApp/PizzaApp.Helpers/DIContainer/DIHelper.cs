using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using PizzaApp.DataAccess.DbContext;
using PizzaApp.Services.UserServices.Abstractions;
using PizzaApp.Services.UserServices.Implementations;
//using Microsoft.EntityFrameworkCore;

namespace PizzaApp.Helpers.DIContainer
{
    public static class DIHelper
    {
        public static void InjectDbContext(IServiceCollection services, string connectionString)
        {
            services.AddDbContext<PizzaAppDbContext>(x => x.UseNpgsql(connectionString));
        }

        public static void InjectServices(IServiceCollection services) 
        {
            services.AddTransient<IUserService, UserService>();
            services.AddTransient<ITokenService, TokenService>();
        }
    }
}
