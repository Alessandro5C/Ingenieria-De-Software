using System;
using System.Collections.Generic;
using System.Text;

namespace LetSkole.Entities
{
    //falta UserId y GroupId ):
    public class UserGroup
    {
        public int UserId { get; set; }
        public User User { get; set; }
        public int GroupId { get; set; }
        public Group Group { get; set; }
        
        public short Grade { get; set; }
        public bool Admin { get; set; }
    }
}
