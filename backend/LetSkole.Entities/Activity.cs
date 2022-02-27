using System;
using System.ComponentModel.DataAnnotations;
using LetSkole.Entities.Indentity;

namespace LetSkole.Entities
{

    public class Activity : EntityBase
    {
        [Required]
        [StringLength(20, MinimumLength = 5,
            ErrorMessage = "Name should be between 5 and 20")]
        public string Name { get; set; }
        [Required]
        [StringLength(256,
            ErrorMessage = "Description cannot be longer than 256")]
        public string Description { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public bool Completed { get; set; }
        public DateTime? StartTime { get; set; }
        public DateTime? EndTime { get; set; }
        
        // MANY TO ONE (FK)
        public string UserId { get; set; }
        public ApplicationUser User { get; set; }
    }
}
