

namespace LetSkole.Dto
{
    public class ApplicationUserLoginDto
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }

    public class ApplicationUserResponseDto
    {
        public int UserId { get; set; }
        public string Email { get; set; }
        public string Token { get; set; }
    }
}