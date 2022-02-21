using LetSkole.DataAccess;
using LetSkole.Dto;
using LetSkole.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Linq;
using System.Collections;
using System.Threading.Tasks;
using AutoMapper;
using LetSkole.Entities.Indentity;

namespace LetSkole.Services
{
    public class GroupService : IGroupService
    {
        private readonly IGroupRepository _repository;
        private readonly IUserRepository _userRepository;
        private readonly IUserGroupRepository _userGroupRepository;
        private readonly IMapper _mapper;
        
        public GroupService(IGroupRepository repository, IUserRepository userRepository,
            IUserGroupRepository userGroupRepository, IMapper mapper)
        {
            _repository = repository;
            _userRepository = userRepository;
            _userGroupRepository = userGroupRepository;
            _mapper = mapper;
        }

        public async Task<GroupResponse> Create(GroupRequest model, string ownerId)
        {
            // Validar que exista el profesor
            // var appUser = await _userRepository.GetItem(entity.OwnerId);
            //
            // if (user == null)
            // {
            //     throw new LetSkoleException("User doesn't exist");
            // }
            //
            // if (user.Student == true)
            // {
            //     throw new LetSkoleException("Students cannot create a group");
            // }

            if (string.IsNullOrEmpty(ownerId) || string.IsNullOrEmpty(model.Name) ||
                string.IsNullOrEmpty(model.Description) || model.MaxGrade <= 0)
                throw new LetSkoleException(400);

            var entity = new Group
            {
                OwnerId = ownerId,
                Name = model.Name,
                Description = model.Description,
                MaxGrade = model.MaxGrade
            };

            // var entit = _mapper.Map<GroupDto, Group>(model);
            await _repository.Create(entity);
            return _mapper.Map<Group, GroupResponse>(entity);
        }

        // public async Task<GroupDto> Create1(GroupDto entity)
        // {
        //     // Validar que exista el profesor
        //     var appUser = await _userRepository.GetItem(entity.OwnerId);
        //
        //     if (user == null)
        //     {
        //         throw new Exception("User doesn't exist");
        //     }
        //
        //     if (user.Student == true)
        //     {
        //         throw new Exception("Students cannot create a group");
        //     }
        //
        //     Group group = new Group
        //     {
        //         Name = entity.Name,
        //         Description = entity.Description,
        //         MaxGrade = entity.MaxGrade
        //     };
        //
        //     await _repository.Create(group);
        //
        //     UserGroup userGroup = new UserGroup
        //     {
        //         GroupId = group.Id,
        //         // ApplicationUserId = user.Id,
        //         Grade = -1,
        //         // Admin = true
        //     };
        //     return await _userGroupRepository.Create(userGroup);
        // }

        public async Task Update(GroupRequest model, int id, string ownerId)
        {
            if (string.IsNullOrEmpty(ownerId) || string.IsNullOrEmpty(model.Name) ||
                string.IsNullOrEmpty(model.Description) || model.MaxGrade <= 0)
                throw new LetSkoleException(400);

            // var entity = _mapper.Map<GroupRequest, Group>(model);
            //
            // entity.Id = id;
            
            var entity = new Group
            {
                Id = id,
                OwnerId = ownerId,
                Name = model.Name,
                Description = model.Description,
                MaxGrade = model.MaxGrade
            };

            // var entit = _mapper.Map<GroupDto, Group>(model);
            await _repository.Update(entity);
            // return _mapper.Map<Group, GroupDto>(entity);;
        }

        // public async Task<GroupDto> Update(GroupDto model)
        // {
        //     Group group = await _repository.GetItem(model.Id);
        //
        //     ApplicationUser auxUser = _userRepository.GetItem(userId).Result;
        //     var auxGroupsTeacher = await _repository.GetCollectionByUserId(userId);
        //
        //     Group auxGroup = new Group {Id = model.Id};
        //     bool contenedor = auxGroupsTeacher.Contains(group);
        //
        //     if (contenedor == false)
        //     {
        //         throw new LetSkoleException("User " + userId + " can't edit this group");
        //     }
        //
        //     if (group == null)
        //     {
        //         throw new NullReferenceException("The group doesn't exists");
        //     }
        //
        //
        //     group.Name = model.Name;
        //     group.Description = model.Description;
        //     //group.MaxGrade = entity.MaxGrade;
        //     return await _repository.Update(group);
        // }

        public async Task Delete(int id)
        {
            await _repository.Delete(id);
        }

        // public async Task<ICollection<GroupDto>> GetCollection(string filter)
        // {
        //     var Collection = await _repository.GetCollection(filter ?? string.Empty);
        //     return Collection.Select(c => new GroupDto
        //     {
        //         // Id = c.Id,
        //         Description = c.Description,
        //         Name = c.Name,
        //         MaxGrade = c.MaxGrade
        //     }).ToList();
        // }

        public async Task<IEnumerable<GroupResponse>> GetEnumerableByUserId(string userId)
        {
            var collection = await _repository.GetCollectionByUserId(userId);

            // return collection.Select(e => new GroupDto
            // {
            //     Name = e.Name,
            //     Description = e.Description,
            //     MaxGrade = e.MaxGrade,
            //     OwnerId = e.OwnerId
            // }).ToList();

            return collection.Select(
                e => _mapper.Map<Group, GroupResponse>(e)
            ).ToList();
        }

        public async Task<IEnumerable<GroupResponse>> GetEnumerableByOwnerId(string ownerId)
        {
            var collection = await _repository.GetCollectionByOwnerId(ownerId);

            return collection.Select(
                e => _mapper.Map<Group, GroupResponse>(e)
            ).ToList();
        }
        //
        // public async Task<GroupDto> GetItem(int id)
        // {
        //     Group group = await _repository.GetItem(id);
        //     GroupDto groupDto = new GroupDto();
        //     // groupDto.Id = group.Id;
        //     groupDto.Name = group.Name;
        //     groupDto.Description = group.Description;
        //     groupDto.MaxGrade = group.MaxGrade;
        //     return groupDto;
        // }
    }
    
    // public class GroupService : IGroupService
    // {
    //     private readonly IGroupRepository _repository;
    //     private readonly IUserRepository _userRepository;
    //     private readonly IUserGroupRepository _userGroupRepository;
    //
    //     public GroupService(IGroupRepository repository, IUserRepository userRepository, IUserGroupRepository userGroupRepository)
    //     {
    //         _repository = repository;
    //         _userRepository = userRepository;
    //         _userGroupRepository = userGroupRepository;
    //     }
    //
    //     public async Task Create(string userId, GroupDto entity)
    //     {
    //         // Validar que exista el profesor
    //         ApplicationUser user = await _userRepository.GetItem(userId);
    //
    //         if(user == null)
    //         {
    //             throw new Exception("User doesn't exist");
    //         }
    //         if(user.Student == true)
    //         {
    //             throw new Exception("Students cannot create a group");
    //         }
    //         Group group = new Group
    //         {
    //             Name = entity.Name,
    //             Description = entity.Description,
    //             MaxGrade = entity.MaxGrade
    //         };
    //
    //         await _repository.Create(group);
    //
    //         UserGroup userGroup = new UserGroup {
    //             GroupId = group.Id,
    //             ApplicationUserId = user.Id,
    //             Grade = -1,
    //             Admin = true
    //         };
    //         await _userGroupRepository.Create(userGroup);
    //     }
    //
    //     public async Task Delete(int id)
    //     { 
    //         await _repository.Delete(id);
    //     }
    //
    //     public async Task<ICollection<GroupDto>> GetCollection(string filter)
    //     {
    //         var Collection = await _repository.GetCollection(filter ?? string.Empty);
    //         return Collection.Select(c => new GroupDto
    //         {
    //             Id = c.Id,
    //             Description = c.Description,
    //             Name = c.Name,
    //             MaxGrade = c.MaxGrade
    //         }).ToList();
    //     }
    //
    //     public async Task<ICollection<GroupDto>> GetCollectionByTeacherId (string userId)
    //     {
    //         ApplicationUser user = await _userRepository.GetItem(userId);
    //
    //         if (user == null)
    //         {
    //             throw new Exception("User doesn't exist");
    //         }
    //         //if (user.Student == true)
    //         //{
    //         //    throw new Exception("Students get groups");
    //         //}
    //
    //         var collectionTeacher =  await _repository.GetCollectionByTeacher(userId);
    //         return collectionTeacher.Select(c => new GroupDto
    //         {   Id = c.Id,
    //             Description = c.Description,
    //             Name = c.Name,
    //             MaxGrade = c.MaxGrade
    //         }).ToList();
    //     }
    //
    //     public async Task<GroupDto> GetItem(int id)
    //     {
    //         Group group = await _repository.GetItem(id);
    //         GroupDto groupDto = new GroupDto();
    //         groupDto.Id = group.Id;
    //         groupDto.Name = group.Name;
    //         groupDto.Description = group.Description;
    //         groupDto.MaxGrade = group.MaxGrade;
    //         return groupDto;
    //     }
    //
    //     public async Task Update(GroupDto entity, string userId)
    //     {
    //         
    //         Group group = await _repository.GetItem(entity.Id);
    //
    //         ApplicationUser auxUser = _userRepository.GetItem(userId).Result;
    //         var auxGroupsTeacher = await _repository.GetCollectionByTeacher(userId);
    //        
    //         Group auxGroup = new Group { Id = entity.Id };
    //         bool contenedor = auxGroupsTeacher.Contains(group);
    //
    //         if (contenedor == false)
    //         {
    //             throw new LetSkoleException("User " + userId + " can't edit this group");
    //         }
    //
    //         if (group == null)
    //         {
    //             throw new NullReferenceException("The group doesn't exists");
    //         }
    //
    //
    //         group.Name = entity.Name;
    //         group.Description = entity.Description;
    //         //group.MaxGrade = entity.MaxGrade;
    //         await _repository.Update(group);
    //     }
    // }
}