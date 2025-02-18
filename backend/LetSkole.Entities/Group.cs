﻿using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using LetSkole.Entities.Indentity;

namespace LetSkole.Entities
{
    public class Group : EntityBase
    {
        [Required]
        [StringLength(20, MinimumLength = 5,
            ErrorMessage = "Name should be between 5 and 20")]
        public string Name { get; set; }

        [Required]
        [StringLength(256,
            ErrorMessage = "Description cannot be longer and 256")]
        public string Description { get; set; }

        [Required]
        [Range(1, short.MaxValue,
            ErrorMessage = "MaxGrade should be between 1 and 32767")]
        public short MaxGrade { get; set; }

        // MANY TO ONE (FK)
        public string OwnerId { get; set; }

        public ApplicationUser Owner { get; set; }

        // MANY TO MANY
        public ICollection<UserGroup> UserGroups { get; set; }
    }
}