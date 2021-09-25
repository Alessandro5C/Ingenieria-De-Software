using System;

namespace LetSkole.Dto
{
    public class UserDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public bool Student { get; set; }
        public string NumTelf { get; set; }
        public string Email { get; set; }
        public DateTime Birthday { get; set; }
        public string School { get; set; }
    }
}