using System;
using System.Collections.Generic;
using System.Text;
using LetSkole.Entities.Indentity;

namespace LetSkole.Entities
{
    public class UserGroup
    {
        public string ApplicationUserId { get; set; }
        public ApplicationUser ApplicationUser { get; set; }
        
        public int GroupId { get; set; }
        public Group Group { get; set; }
        
        // PROPERTIES
        public short Grade { get; set; }
    }
}
