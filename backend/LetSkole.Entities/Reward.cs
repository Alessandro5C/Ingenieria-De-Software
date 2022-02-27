using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace LetSkole.Entities
{
    public class Reward : EntityBase
    {
        [Required]
        [StringLength(15, MinimumLength = 5)]
        public string Name { get; set; }
        [StringLength(256)]
        public string Description { get; set; }
        [Required]
        [StringLength(256)]
        public string Image { get; set; }
        
        // MANY TO ONE (FK)
        public int GameId { get; set; }
        public Game Game { get; set; }
        // MANY TO MANY
        public ICollection<RewardUser> RewardUsers { get; set; }
    }
}
