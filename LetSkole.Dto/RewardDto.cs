using System;
using System.Collections.Generic;
using System.Text;

namespace LetSkole.Dto
{
    public class RewardDto
    {
        public int Id { get; set;}
        public int GameId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Image { get; set; }
    }
}
