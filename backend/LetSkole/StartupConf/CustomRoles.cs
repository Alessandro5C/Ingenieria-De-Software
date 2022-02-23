using System;
using LetSkole.Entities.Indentity;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;

namespace LetSkole.StartupConf
{
    public static class CustomRoles
    {
        public static void CreateRoles(IServiceProvider serviceProvider)
        {
            var roleManager = serviceProvider.GetRequiredService<RoleManager<ApplicationRole>>();
            string[] roleNames = {"Student", "Teacher"};

            foreach (var roleName in roleNames)
            {
                var roleExist = roleManager.RoleExistsAsync(roleName);
                roleExist.Wait();
                
                if (roleExist.Result) continue;
                
                var entity = new ApplicationRole {Name = roleName};
                var roleResult = roleManager.CreateAsync(entity);
                roleResult.Wait();
            }
        }
    }
}