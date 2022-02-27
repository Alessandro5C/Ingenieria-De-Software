using LetSkole.DataAccess;
using LetSkole.DataAccess.Implementations;
using LetSkole.Services.Implementations;
using Microsoft.Extensions.DependencyInjection;

namespace LetSkole.Services
{
    public static class InjectionDependency
    {
        public static IServiceCollection AddInjection(this IServiceCollection services)
        {
            return services
                .AddScoped<IUserRepository, UserRepository>()
                .AddTransient<IUserService, UserService>()
                .AddScoped<IActivityRepository, ActivityRepository>()
                .AddTransient<IActivityService, ActivityService>()
                .AddScoped<IGroupRepository, GroupRepository>()
                .AddTransient<IGroupService, GroupService>()
                .AddScoped<IUserGroupRepository, UserGroupRepository>()
                .AddTransient<IUserGroupService, UserGroupService>()
                .AddTransient<IRewardUserService, RewardUserService>()
                .AddScoped<IRewardUserRepository, RewardUserRepository>()
                .AddTransient<IGameService, GameService>()
                .AddScoped<IGameRepository, GameRepository>();
        }
    }
}