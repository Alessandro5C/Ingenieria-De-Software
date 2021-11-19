using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;
using LetSkole.Entities.Indentity;

namespace LetSkole.Entities
{
    public class User:EntityBase
    {
        [Required]
        [StringLength(50)]
        public string Name { get; set; }
        public bool Student { get; set; }
        [Required]
        [StringLength(15)]
        public string NumTelf { get; set; }
        [Required]
        [StringLength(30)]
        public string Email { get; set; }
        public DateTime Birthday { get; set; }
        [Required]
        [StringLength(30)]
        public string School { get; set; }
        // FK for IDENTITY
        public string ApplicationUserId { get; set; }
        public ApplicationUser ApplicationUser { get; set; }
        // MANY to MANY
        public ICollection<RewardUser> RewardUsers { get; set; }
        public ICollection<UserGroup> UserGroups { get; set; }
    }
}
