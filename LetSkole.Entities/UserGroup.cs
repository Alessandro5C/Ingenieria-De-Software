using System;
using System.Collections.Generic;
using System.Text;

namespace LetSkole.Entities
{
    //falta UserId y GroupId ):
    public class UserGroup
    {
        public int UserId { get; set; }
        public int GroupId { get; set; }
        public short Grade { get; set; }
        public bool Admin { get; set; }
    }
}
