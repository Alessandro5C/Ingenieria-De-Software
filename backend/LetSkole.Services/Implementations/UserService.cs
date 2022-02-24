using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using LetSkole.DataAccess;
using LetSkole.Dto;
using LetSkole.Entities.Indentity;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;

namespace LetSkole.Services.Implementations
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _repository;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IMapper _mapper;


        public UserService(
            IUserRepository repository,
            UserManager<ApplicationUser> userManager,
            IMapper mapper
        )
        {
            _repository = repository;
            _userManager = userManager;
            _mapper = mapper;
        }

        public async Task<AppUserResponse> GetItemById(string id)
        {
            var entity = await _userManager.FindByIdAsync(id);
            if (entity == null) throw new LetSkoleException(404);
            return _mapper.Map<ApplicationUser, AppUserResponse>(entity);
        }

        public async Task<AppUserResponse> Create(AppUserRequestForPost model)
        {
            // VALIDATE DATA HERE
            const string message = "Bad Request: 'name' is empty";
            if (string.IsNullOrEmpty(model.DisplayedName))
                throw new LetSkoleException(message, 400);

            // CREATE OBJECT HERE
            var entity = new ApplicationUser
            {
                Email = model.Email,
                DisplayedName = model.DisplayedName,
                UserName = UniqueUserName(model.DisplayedName),
            };

            // REPOSITORY CALLS HERE
            try
            {
                await _repository.Create(
                    entity, _userManager, model.Password, model.Role
                );
            }
            catch (Exception e)
            {
                throw new LetSkoleException(e.Message, 400);
            }

            return _mapper.Map<ApplicationUser, AppUserResponse>(entity);
        }

        public async Task Update(string id, AppUserRequestForPut model)
        {
            // VALIDATE DATA HERE
            const string message = "Bad Request: Name(lenght 1-20), Description(lenght 1-256)";
            if (string.IsNullOrEmpty(model.DisplayedName) ||
                string.IsNullOrEmpty(model.School) ||
                string.IsNullOrEmpty(model.PhoneNumber))
                throw new LetSkoleException(message, 400);

            // RETRIEVE OBJECT HERE
            var entity = await _userManager.FindByIdAsync(id);
            if (entity == null) throw new LetSkoleException(404);

            // MODIFY DATA HERE
            entity.DisplayedName = model.DisplayedName;
            entity.School = model.School;
            entity.PhoneNumber = model.PhoneNumber;
            entity.Birthday = model.Birthday;

            // REPOSITORY CALLS HERE
            var result = await _userManager.UpdateAsync(entity);
            if (!result.Succeeded)
                throw new LetSkoleException(result.ToString(), 400);

            try
            {
                await _repository.SaveChanges();
            }
            catch (Exception e)
            {
                throw new LetSkoleException(e.Message, 400);
            }
        }

        public async Task<AppIdentityResponse> IdentitySignIn(
            AppIdentityRequest model,
            Func<ApplicationUser, string, bool, Task<SignInResult>> checkFunc,
            string secretKey
        )
        {
            var response = new AppIdentityResponse();
            // RETRIEVE OBJECT HERE
            var entity = await _userManager.FindByEmailAsync(model.Email);
            if (entity == null) return response;

            // CHECK IF PASSWORD IS CORRECT
            var check = await checkFunc(entity, model.Password, false);
            if (!check.Succeeded) return response;

            // GENERATE THE TOKEN AND ASSIGN IT
            var token = await GenerateToken(entity, secretKey);
            response = new AppIdentityResponse
            {
                Id = entity.Id, Token = token, Valid = true
            };

            return response;
        }

        // NOTE: Below here are defined **private** methods

        private static string UniqueUserName(string displayedName)
        {
            return displayedName + "#" +
                   DateTime.UtcNow.Ticks + "#" +
                   Guid.NewGuid();
        }

        private async Task<string> GenerateToken(ApplicationUser entity, string secretKey)
        {
            var secretKeyEncoded = Encoding.ASCII.GetBytes(secretKey);

            var claims = new List<Claim> {new Claim("AppUserId", entity.Id)};
            var roles = await _userManager.GetRolesAsync(entity);
            claims.AddRange(roles
                .Select(role => new Claim(ClaimTypes.Role, role)));

            var descriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddMinutes(120),
                SigningCredentials = new SigningCredentials(
                    new SymmetricSecurityKey(secretKeyEncoded),
                    SecurityAlgorithms.HmacSha256Signature
                )
            };

            var handler = new JwtSecurityTokenHandler();
            var createdToken = handler.CreateToken(descriptor);

            return handler.WriteToken(createdToken);
        }
    }
}