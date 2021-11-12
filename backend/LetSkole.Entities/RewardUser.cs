using System;
using System.Collections.Generic;
using System.Text;

namespace LetSkole.Entities
{
    public class RewardUser
    {
        public int UserId { get; set; }
        public User User { get; set; }

        public int RewardId { get; set; }
        public Reward Reward { get; set; }
    }
}
