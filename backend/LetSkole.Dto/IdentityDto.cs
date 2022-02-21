using System;

namespace LetSkole.Dto
{
    public class AppIdentityRequestDto
    {
        public string Password { get; set; }
        public string Email { get; set; }
    }
    
    public class AppIdentityResponseDto
    {
        public string Id { get; set; } = string.Empty;
        public string Token { get; set; } = string.Empty;
        public bool Valid { get; set; } = false;
    }
}