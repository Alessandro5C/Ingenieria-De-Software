using LetSkole.DataAccess;
using LetSkole.Dto;
using LetSkole.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace LetSkole.Services
{
    public class ActivityService : IActivityService
    {

        private readonly IActivityRepository _repository;

        
        public ActivityService(IActivityRepository repository)
        {
            _repository = repository;

        }


        public void Create(ActivityDto entity)
        {
         
            _repository.Create(new Activity
            {
                UserId = entity.UserId, //validar el user id
                Name = entity.Name,
                Description = entity.Description,
                StartDate = entity.StartDate,
                EndDate = entity.EndDate,
                Completed = entity.Completed,
                DoDate = entity.DoDate,
                StartTime = entity.StartTime,
                EndTime = entity.EndTime,
            });
        }

        public void Delete(int id)
        {
            throw new NotImplementedException();
        }

        public ICollection<ActivityDto> GetCollection(string filter)
        {
            var Collection = _repository.GetActivities(filter ?? string.Empty);
            return Collection.Select(c => new ActivityDto
            {
                UserId = c.UserId,
                Name = c.Name,
                Description = c.Description,
                StartDate = c.StartDate,
                EndDate = c.EndDate,
                Completed = c.Completed,
                DoDate = c.DoDate,
                StartTime = c.StartTime,
                EndTime = c.EndTime
            }).ToList();
        }

        public ActivityDto GetItem(int id)
        {
            throw new NotImplementedException();
        }

        public void Update(int id, ActivityDto entity)
        {
            throw new NotImplementedException();
        }
    }
}
