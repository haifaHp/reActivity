using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Persistence;
using Microsoft.EntityFrameworkCore;

namespace API
{
    public class Program
    {
        // when we start our application ,first check if we have database or not,if not we efectevly create or database
        // we do it in program class
        public static async Task Main(string[] args)
        {
          var host=  CreateHostBuilder(args).Build();
          using var scop=host.Services.CreateScope();
          var Services =scop.ServiceProvider;
          try{
            var context=Services.GetRequiredService<DataContext>();
                await context.Database.MigrateAsync();
            await Seed.SeedData(context);
          }
          catch(Exception ex ){
            var logger=Services.GetRequiredService<ILogger<Program>>();
            logger.LogError(ex,"An error occured during migration");
          }
            //we need run application
            await host.RunAsync();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
                //end of this seosen
    }
}
