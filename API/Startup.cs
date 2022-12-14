using API.Data;
using API.Extensions;
using API.Helpers;
using API.Interfaces;
using API.Middleware;
using API.Services;
using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace API
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.Configure<CloudinarySettings>(Configuration.GetSection("CloudinarySettings"));
            services.AddScoped<ITokenService, TokenService>();
            services.AddScoped<IPhotoService, PhotoService>();
            services.AddScoped<ILikesRepository, LikesRepository>();
            services.AddScoped<LogUserActivity>();   
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddAutoMapper(typeof(AutoMapperProfiles).Assembly);
            string mySqlConnectionStr = Configuration.GetConnectionString("DefaultConnection");
            services.AddDbContextPool<DataContext>(option => option.UseMySQL(mySqlConnectionStr));
            services.AddControllers();
            services.AddCors();
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                {
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["TokenKey"])),
                        ValidateIssuer = false,
                        ValidateAudience = false

                    };
                });
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "API", Version = "v1" }); 
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {

      

        if (env.IsDevelopment())
                {
                    //app.UseDeveloperExceptionPage();
                    app.UseSwagger();
                     app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "API v1"));
                 }

            app.UseMiddleware<ExceptionMiddleware>();
            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseCors(x => x.AllowAnyHeader().AllowAnyMethod().WithOrigins("https://localhost:4200"));

            app.UseAuthentication(); 

            app.UseAuthorization();
             
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
