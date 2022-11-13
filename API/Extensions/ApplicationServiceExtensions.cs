using API.Data;
using API.Interfaces;
using API.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Threading.Tasks;

namespace API.Extensions
{
    public static class ApplicationServiceExtensions
    {

     
       public static IConfiguration Configuration { get; }
        public static IServiceCollection AddAplicationServices(this IServiceCollection services, IConfiguration configuration)
        {
           
            services.AddScoped<ITokenService, TokenService>();
            string mySqlConnectionStr = Configuration.GetConnectionString("DefaultConnection");
            services.AddDbContextPool<DataContext>(option => option.UseMySQL(mySqlConnectionStr));
            return services;
        }
    }
}
