using System.IdentityModel.Tokens.Jwt;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace LetSkole.Controllers
{
    [ApiController]
    [Produces("application/json")]
    [Route("api/v2/[controller]/[action]")]
    [Authorize(AuthenticationSchemes =
        Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme)]
    public class LetSkoleController : ControllerBase
    {
        [NonAction]
        protected async Task<string> GetJwtPayloadData(string key)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var accessToken = await HttpContext.GetTokenAsync("access_token");
            var jwtSecurityToken = tokenHandler.ReadJwtToken(accessToken);
            return jwtSecurityToken.Payload[key].ToString();
        }
    }
}