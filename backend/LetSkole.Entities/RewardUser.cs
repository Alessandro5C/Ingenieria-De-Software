using System;
using System.Collections.Generic;
using System.Text;
using LetSkole.Entities.Indentity;

namespace LetSkole.Entities
{
    public class RewardUser
    {
        public string ApplicationUserId { get; set; }
        public ApplicationUser ApplicationUser { get; set; }

        public int RewardId { get; set; }
        public Reward Reward { get; set; }
    }
}
