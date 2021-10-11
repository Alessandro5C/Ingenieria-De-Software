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
            optionsBuilder
                .UseSqlServer(@"Server = DESKTOP-D0NTU35; Database = LetSkoleDb; Integrated Security = true;");
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<UserGroup>().HasKey(x => new { x.UserId, x.GroupId });
        }

        public DbSet<User> Users { get; set; }
        //public DbSet<UserGroup> UserGroups { get; set; }
        public DbSet<Group> Groups { get; set; }
        public DbSet<Reward> Rewards { get; set; }
        public DbSet<Game> Games { get; set; }
        public DbSet<Activity> Activities { get; set; }
        public DbSet<UserGroup> userGroups { get; set; }
    }
}
