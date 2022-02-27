using LetSkole.Entities.Indentity;

namespace LetSkole.Entities
{
    public class RewardUser
    {
        public string UserId { get; set; }
        public ApplicationUser User { get; set; }

        public int RewardId { get; set; }
        public Reward Reward { get; set; }
    }
}
