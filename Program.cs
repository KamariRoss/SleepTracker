using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using SleepTracker.Models;

namespace SleepTracker
{
  public class Program
  {
    public static async Task Main(string[] args)
    {
      var host = CreateWebHostBuilder(args).Build();
      using (var scope = host.Services.CreateScope())
      {
        var context = scope.ServiceProvider.GetRequiredService<DatabaseContext>();
        Console.WriteLine("Starting to migrate database....");
        await context.Database.MigrateAsync();
        Console.WriteLine("Database is up to date, #party time");
      }

      await host.RunAsync();
    }

    public static IWebHostBuilder CreateWebHostBuilder(string[] args) =>
        WebHost.CreateDefaultBuilder(args)
            .UseStartup<Startup>();
  }
}
