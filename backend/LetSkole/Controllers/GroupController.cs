using LetSkole.Dto;
using LetSkole.Services;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;

namespace LetSkole.Controllers
{
    [ApiController]
    [Produces("application/json")]
    [Route("api/v2/[controller]/[action]")]
    [Authorize(AuthenticationSchemes =
        Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme)]
    public class GroupController : Controller
    {
        private readonly IGroupService _service;
        private readonly IMapper _mapper;

        public GroupController(IGroupService service, IMapper mapper)
        {
            _service = service;
            _mapper = mapper;
        }

        [HttpPost]
        [ProducesResponseType(typeof(LetSkoleResponse<GroupResponse>), 200)]
        [ProducesResponseType(typeof(LetSkoleResponse), 400)]
        public async Task<ActionResult> Post([FromBody] GroupRequest model)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var accessToken = await HttpContext.GetTokenAsync("access_token");
            var jwt = tokenHandler.ReadJwtToken(accessToken);
            var jwtId = jwt.Payload["AppUserId"];
            // GroupDto response;
            try
            {
                // response = await _service.Create(model);
                var response = await _service.Create(model, jwtId.ToString());
                return Ok(LetSkoleResponse<GroupResponse>.Success(response));
            }
            catch (LetSkoleException e)
            {
                return BadRequest(e.Message + " " + e.Code);
            }
        }

        // [Route("GetAllByFilter")]
        // [HttpGet]
        // public async Task<ActionResult<IEnumerable<GroupDto>>> GetAllByFilter([FromQuery] string filter)
        // {
        //     return Accepted(await _service.GetCollection(filter));
        // }

//         [Route("GetAllByTeacherId")]
//         [HttpGet]
//         public async Task<ActionResult<IEnumerable<GroupDto>>> GetAllByTeacherId ([FromQuery] int userId)
//         {
//             IEnumerable<GroupDto> collection;
//             try
// =======
//             catch (LetSkoleException e)
// >>>>>>> Stashed changes
//             {
//                 return BadRequest(e.Message + " " + e.Code);
//             }
//
//             // return Ok(LetSkoleResponse<GroupDto>.Success(response));
//         }

        [HttpPut]
        [ProducesResponseType(typeof(LetSkoleResponse), 200)]
        [ProducesResponseType(typeof(LetSkoleResponse), 400)]
        public async Task<IActionResult> Put([FromBody] GroupRequest model, [FromQuery] int id)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var accessToken = await HttpContext.GetTokenAsync("access_token");
            var jwt = tokenHandler.ReadJwtToken(accessToken);
            var jwtId = jwt.Payload["AppUserId"];
            try
            {
                await _service.Update(model, id, jwtId.ToString());
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }

            return Ok(
                LetSkoleResponse.Success("Ok: Group has been updated")
            );
        }

        [HttpDelete]
        [ProducesResponseType(typeof(LetSkoleResponse), 200)]
        [ProducesResponseType(typeof(LetSkoleResponse), 404)]
        public async Task<IActionResult> Delete([FromQuery] int id)
        {
            try
            {
                await _service.Delete(id);
            }
            catch (Exception e)
            {
                return NotFound(LetSkoleResponse.Error(e.Message, 404));
            }

            return Ok(LetSkoleResponse
                .Success("Ok: Group has been deleted")
            );
        }

        // [HttpGet]
        // public async Task<ActionResult<IEnumerable<GroupDto>>> GetAllByFilter([FromQuery] string filter)
        // {
        //     return Accepted(await _service.GetCollection(filter));
        // }
        //
        // [HttpGet]
        // public async Task<ActionResult<IEnumerable<GroupDto>>> GetAllByTeacherId ([FromQuery] string userId)
        // {
        //     IEnumerable<GroupDto> collection;
        //     try
        //     {
        //         collection = await _service.GetEnumerableByUserId(userId);
        //     } catch(NullReferenceException e)
        //     {
        //         return NotFound(e.Message);
        //     } catch(LetSkoleException e)
        //     {
        //         return BadRequest(e.Message + " " + e.value);
        //     }
        //     return Ok(collection);
        // }

        [HttpGet]
        [ProducesResponseType(typeof(LetSkoleResponse<IEnumerable<GroupResponse>>), 200)]
        public async Task<ActionResult> GetAllByUserId([FromQuery] string userId)
        {
            var response = await _service.GetEnumerableByUserId(userId);
            return Ok(LetSkoleResponse<IEnumerable<GroupResponse>>.Success(response));
        }

        [HttpGet]
        [ProducesResponseType(typeof(LetSkoleResponse<IEnumerable<GroupResponse>>), 200)]
        public async Task<ActionResult> GetAllByOwnerId([FromQuery] string ownerId)
        {
            var response = await _service.GetEnumerableByOwnerId(ownerId);
            return Ok(LetSkoleResponse<IEnumerable<GroupResponse>>.Success(response));
        }


        // [HttpGet]
        // public async Task<ActionResult<GroupDto>> GetItemById ([FromQuery] int id)
        // {
        //     GroupDto group;
        //     try {
        //         group = await _service.GetItem(id);
        //     } catch(Exception e)
        //     {
        //         return BadRequest(e.Message);
        //     }
        //     return Accepted(group);
        // }
        //
    }
}
