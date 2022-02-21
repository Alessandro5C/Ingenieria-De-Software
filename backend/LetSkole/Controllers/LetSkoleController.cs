using Microsoft.AspNetCore.Mvc;

namespace LetSkole.Controllers
{
    [ApiController]
    [Produces("application/json")]
    [Route("api/v2/[controller]/[action]")]
    public class LetSkoleController : ControllerBase {}
}