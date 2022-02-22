using System;
using System.Collections.Generic;
using System.Text;

namespace LetSkole.Dto
{
    public class GroupRequestForPost
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public int MaxGrade { get; set; }
    }
    
    public class GroupRequestForPut
    {
        public string Name { get; set; }
        public string Description { get; set; }
    }

    public class GroupResponse : GroupRequestForPost
    {
        public int Id { get; set; }
        public string OwnerId { get; set; }
    }
}
