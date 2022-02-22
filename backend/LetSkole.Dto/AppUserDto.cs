using System;

namespace LetSkole.Dto
{
    public class AppUserRequestForPost
    {
        public string Password { get; set; }
        public string Email { get; set; }
        public string DisplayedName { get; set; }
        public bool Student { get; set; }
    }

    public class AppUserRequestForPut
    {
        public string DisplayedName { get; set; }
        public string PhoneNumber { get; set; }
        public DateTime Birthday { get; set; }
        public string School { get; set; }
    }
    
    public class AppUserResponse
    {
        public string Id { get; set; }
        public string DisplayedName { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public bool Student { get; set; }
        public DateTime Birthday { get; set; }
        public string School { get; set; }
    }
}