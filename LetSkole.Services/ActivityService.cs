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
            _repository.Delete(id);
        }

        public ICollection<ActivityDto> GetCollection(string filter)
        {
            var Collection = _repository.GetActivities(filter ?? string.Empty);
            return Collection.Select(c => new ActivityDto
            {
                Id = c.Id,
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
            Activity activity = _repository.GetItem(id);
            ActivityDto activityDto = new ActivityDto();

            activityDto.Id = activity.Id;
            activityDto.UserId = activity.UserId;
            activityDto.Name = activity.Name;
            activityDto.Description = activity.Description;
            activityDto.StartDate = activity.StartDate;
            activityDto.EndDate = activity.EndDate;
            activityDto.Completed = activity.Completed;
            activityDto.DoDate = activity.DoDate;
            activityDto.StartTime = activity.StartTime;
            activityDto.EndTime = activity.EndTime;
            return activityDto;
        }

        public void Update(ActivityDto entity)
        {
            Activity activity = _repository.GetItem(entity.Id);

            activity.UserId = entity.UserId;
            activity.Name = entity.Name;
            activity.Description = entity.Description;
            activity.StartDate = entity.StartDate;
            activity.EndDate = entity.EndDate;
            activity.Completed = entity.Completed;
            activity.DoDate = entity.DoDate;
            activity.StartTime = entity.StartTime;
            activity.EndTime = entity.EndTime;

            _repository.Update(activity);
        }
    }
}
