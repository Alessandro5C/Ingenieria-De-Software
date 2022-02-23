using LetSkole.DataAccess;
using LetSkole.Entities.Indentity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace LetSkole.StartupConf
{
    public class CustomUserStore : UserStore<ApplicationUser>
    {
        public CustomUserStore(LetSkoleDbContext context)
            : base(context)
        {
            AutoSaveChanges = false;
        }
    }
}