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
        [Required]
        [DefaultValue(true)]
        public bool Student { get; set; }
        // [Required]
        // [StringLength(15)]
        // public string NumTelf { get; set; }
        public DateTime Birthday { get; set; }
        [StringLength(30)]
        public string School { get; set; }
        
        // MANY to MANY
        public ICollection<RewardUser> RewardUsers { get; set; }
        public ICollection<UserGroup> UserGroups { get; set; }
        // MANY to MANY required
        public List<ApplicationUserRole> UserRoles { get; set; }
    }
}