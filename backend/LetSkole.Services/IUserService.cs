using System;
using System.Threading.Tasks;
using LetSkole.Dto;
using LetSkole.Entities.Indentity;
using Microsoft.AspNetCore.Identity;

namespace LetSkole.Services
{
    public interface IUserService
    {
        /// <param name="id">AppUserId of the row you're attempting to retrieve.</param>
        Task<AppUserResponse> GetItemById(string id);

        Task<AppUserResponse> Create(AppUserRequestForPost model);

        /// <param name="id">Alias for AppUserId, should be handled by the server.</param>
        Task Update(string id, AppUserRequestForPut model);

        /// <summary>A probably overthinked service method for sign in operation</summary>
        Task<AppIdentityResponse> IdentitySignIn(
            AppIdentityRequest model,
            Func<ApplicationUser, string, bool, Task<SignInResult>> checkFunc,
            string secretKey
        );
    }
}