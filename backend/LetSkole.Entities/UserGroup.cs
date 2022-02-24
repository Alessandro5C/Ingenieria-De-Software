using System.ComponentModel.DataAnnotations;
using LetSkole.Entities.Indentity;

namespace LetSkole.Entities
{
    public class UserGroup
    {
        public string UserId { get; set; }
        public ApplicationUser User { get; set; }

        public int GroupId { get; set; }
        public Group Group { get; set; }

        [Range(0, short.MaxValue,
            ErrorMessage = "Grade can not be negative")]
        public short? Grade { get; set; }
    }
}