using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace LetSkole.Entities
{
    public class Game:EntityBase
    {
        [Required]
        [StringLength(15)]
        public string Name { get; set; }
        [Required]
        [StringLength(256)]
        public string Description { get; set; }
        [Required]
        [StringLength(256)]
        public string Link { get; set; }
        
        // ONE TO MANY
        public ICollection<Reward> Rewards { get; set; }
    }
}
