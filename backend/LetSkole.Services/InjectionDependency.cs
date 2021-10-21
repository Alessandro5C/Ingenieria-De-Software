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
                .AddTransient<IActivityService, ActivityService>()
                .AddScoped<IGroupsRepository, GroupsRepository>()
                .AddTransient<IGroupService, GroupService>()
                .AddScoped<IUserGroupRepository, UserGroupRepository>()
                .AddTransient<IUserGroupService, UserGroupService>()
                .AddTransient<IRewardService, RewardService>()
                .AddScoped<IRewardsRepository, RewardsRepository>()
                .AddTransient<IGameService, GameService>()
                .AddScoped<IGameRepository, GameRepository>();
        }
    }
}