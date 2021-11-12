using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace LetSkole.Entities
{
    public class Reward:EntityBase
    {
        public int GameId { get; set; }
        public Game Game { get; set; }

        [Required]
        [StringLength(15)]
        public string Name { get; set; }
        [Required]
        [StringLength(256)]
        public string Description { get; set; }
        [Required]
        [StringLength(256)]
        public string Image { get; set; }
        
        public ICollection<RewardUser> RewardUsers { get; set; }
    }
}
