using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace LetSkole.Entities.Indentity
{
    public class ApplicationRole: IdentityRole
    {
        public List<ApplicationUserRole> UserRoles { get; set; }
    }
}