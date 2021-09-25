using LetSkole.DataAccess;
using Microsoft.Extensions.DependencyInjection;

namespace LetSkole.Services
{
    public static class InjectionDependency
    {
        public static IServiceCollection AddInjection(this IServiceCollection services)
        {
            return services.AddScoped<IUserRepository, UserRepository>()
                .AddTransient<IUserService, UserService>()
                .AddScoped<IActivityRepository, ActivityRepository>()
                .AddTransient<IActivityService,ActivityService>()
                .AddScoped<IGroupsRepository, GroupsRepository>()
                .AddTransient<IGroupService, GroupService>();
        }
    }
}