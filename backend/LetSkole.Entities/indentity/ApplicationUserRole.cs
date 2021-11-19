using Microsoft.AspNetCore.Identity;

namespace LetSkole.Entities.Indentity
{
    public class ApplicationUserRole: IdentityUserRole<string>
    {
        public ApplicationUser User { get; set; }
        public ApplicationRole Role { get; set; }
    }
}