using System;
using System.Threading.Tasks;
using AutoMapper;
using LetSkole.DataAccess;
using LetSkole.Dto;
using LetSkole.Entities.Indentity;
using Microsoft.AspNetCore.Identity;

namespace LetSkole.Services.Implementations
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _repository;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IMapper _mapper;


        public UserService(IUserRepository repository, UserManager<ApplicationUser> userManager, IMapper mapper)
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

        // NOTE: Below here are defined **private** methods

        private static string UniqueUserName(string displayedName)
        {
            return displayedName + "#" +
                   DateTime.UtcNow.Ticks + "#" +
                   Guid.NewGuid();
        }
    }
}