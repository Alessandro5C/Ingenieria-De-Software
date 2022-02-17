using LetSkole.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Text;
using LetSkole.Entities.Indentity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace LetSkole.DataAccess
{
    public class LetSkoleDbContext : IdentityDbContext<ApplicationUser>
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
            // This line, can even be commented, unless you do `dotnet ef database` commands
             optionsBuilder
                 .UseSqlServer(@"Server = dwlaptop; Database = LetSkoleDb2; Integrated Security = true;");   
                 // .UseSqlServer(@"Server = _hostname_; Database = LetSkoleDbWithAuth; Integrated Security = true;");   
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Required for Identity to work
            base.OnModelCreating(modelBuilder);
            // User Constraints
            // modelBuilder.Entity<ApplicationUser>()
            //     .HasAlternateKey(e => e.Email)
            //     .HasName("AlternateKey_Email");
            // Many to many Keys Configuration
            modelBuilder.Entity<UserGroup>().HasKey(x => new {x.ApplicationUserId, x.GroupId });
            modelBuilder.Entity<RewardUser>().HasKey(x => new { x.ApplicationUserId, x.RewardId });
            // Identity Configuration
            modelBuilder.Entity<ApplicationUser>()
                .HasMany(e => e.UserRoles)
                .WithOne(e=> e.ApplicationUser)
                .HasForeignKey(e => e.UserId)
                .IsRequired();
            modelBuilder.Entity<ApplicationRole>()
                .HasMany(e => e.UserRoles)
                .WithOne(e => e.ApplicationRole)
                .HasForeignKey(e => e.RoleId)
                .IsRequired();
        }

        // public DbSet<User> Users { get; set; }
        public DbSet<Group> Groups { get; set; }
        public DbSet<Reward> Rewards { get; set; }
        public DbSet<Game> Games { get; set; }
        public DbSet<Activity> Activities { get; set; }
        
        public DbSet<RewardUser> RewardUsers { get; set; }
        public DbSet<UserGroup> UserGroups { get; set; }
    }
}
