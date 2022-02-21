using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;
using LetSkole.Entities.Indentity;

namespace LetSkole.Entities
{
    public class Group:EntityBase
    {
        [Required]
        [StringLength(20)]
        public string Name { get; set; }
        [Required]
        [StringLength(256)]
        public string Description { get; set; }
        public int MaxGrade { get; set; }
        
        // MANY TO ONE (FK)
        public string OwnerId { get; set; }
        public ApplicationUser Owner { get; set; }
        // MANY TO MANY
        public ICollection<UserGroup> UserGroups { get; set; }
    }
}
