

using System;

namespace LetSkole.Dto
{
    public class ApplicationUserLoginDto
    {
        public string Password { get; set; }
        public string Email { get; set; }
    }
    
    public class ApplicationUserRegisterDto
    {
        public string Password { get; set; }
        public string Email { get; set; }
        public string Name { get; set; }
        public bool Student { get; set; }
    }

    public class ApplicationUserResponseDto
    {
        public string Id { get; set; }
        public string Email { get; set; }
        public string Token { get; set; }
    }
    
    public class ApplicationUserDto
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public bool Student { get; set; }
        public DateTime Birthday { get; set; }
        public string School { get; set; }
    }
}