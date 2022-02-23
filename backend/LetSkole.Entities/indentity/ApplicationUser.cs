using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace LetSkole.Entities.Indentity
{
    public class ApplicationUser:IdentityUser
    {
        [Required]
        [StringLength(50)]
        public string DisplayedName { get; set; }
        public DateTime Birthday { get; set; }
        [StringLength(30)]
        public string School { get; set; }
        
        // ONE TO MANY
        public ICollection<Activity> Activities { get; set; }
        public ICollection<Group> Groups { get; set; }
        // MANY TO MANY
        public ICollection<RewardUser> RewardUsers { get; set; }
        public ICollection<UserGroup> UserGroups { get; set; }
        // REQUIRED BY IDENTITY
        public List<ApplicationUserRole> UserRoles { get; set; }
    }
}