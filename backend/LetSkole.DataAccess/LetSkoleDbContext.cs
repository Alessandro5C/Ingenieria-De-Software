using LetSkole.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace LetSkole.DataAccess
{
    public class LetSkoleDbContext : DbContext
    {
        public LetSkoleDbContext(
            DbContextOptions<LetSkoleDbContext> options)
            : base(options)
        {

        }

        public LetSkoleDbContext()
        {

        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            //This line, can even be commented, unless you do `dotnet ef database` commands
            // optionsBuilder
            //     .UseSqlServer(@"Server = _hostname_; Database = LetSkoleDb; Integrated Security = true;");   
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<UserGroup>().HasKey(x => new { x.UserId, x.GroupId });
            modelBuilder.Entity<RewardUser>().HasKey(x => new { x.UserId, x.RewardId });

        }

        public DbSet<User> Users { get; set; }
        public DbSet<Group> Groups { get; set; }
        public DbSet<Reward> Rewards { get; set; }
        public DbSet<Game> Games { get; set; }
        public DbSet<Activity> Activities { get; set; }
        
        public DbSet<RewardUser> RewardUsers { get; set; }
        public DbSet<UserGroup> UserGroups { get; set; }
    }
}
