using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace LetSkole.Entities.Indentity
{
    public class ApplicationUser:IdentityUser
    {
        public List<ApplicationUserRole> UserRoles { get; set; }
    }
}