using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using LetSkole.DataAccess;
using LetSkole.Dto;
using LetSkole.Entities;

namespace LetSkole.Services.Implementations
{
    public class ActivityService : IActivityService
    {
        private readonly IActivityRepository _repository;
        private readonly IMapper _mapper;

        public ActivityService(IActivityRepository repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        public async Task<ActivityResponse> Create(string userId, ActivityRequestForPost model)
        {
            // VALIDATE DATA HERE
            const string message = "Bad Request: Name(from 1-20), Description(from 1-256)";
            if (string.IsNullOrEmpty(model.Name) ||
                string.IsNullOrEmpty(model.Description))
                throw new LetSkoleException(message, 400);

            var startDate = IsStartDateCorrect(model.StartDate);
            var endDate = IsEndDateCorrect(startDate, model.EndDate);

            // CREATE OBJECT HERE
            var entity = new Activity
            {
                UserId = userId,
                Name = model.Name,
                Description = model.Description,
                StartDate = startDate,
                EndDate = endDate,
                Completed = false,
                StartTime = null,
                EndTime = null
            };

            // REPOSITORY CALLS HERE
            try
            {
                await _repository.Create(entity);
            }
            catch (Exception e)
            {
                throw new LetSkoleException(e.Message, 400);
            }

            return _mapper.Map<Activity, ActivityResponse>(entity);
        }

        public async Task Update(string userId, ActivityRequestForPut model, int id)
        {
            // VALIDATE DATA HERE
            const string message = "Bad Request: Description(from 1-256)";
            if (string.IsNullOrEmpty(model.Description))
                throw new LetSkoleException(message, 400);

            // RETRIEVE OBJECT HERE
            var entity = await _repository.GetItemById(id);
            if (entity == null) throw new LetSkoleException(404);
            if (entity.UserId != userId) throw new LetSkoleException(403);

            // MODIFY (AND VALIDATE) DATA HERE
            entity.Description = model.Description;
            entity.EndDate = IsEndDateCorrect(
                entity.StartDate, model.EndDate);
            entity.Completed = model.Completed;
            entity.StartTime = IsStartTimeCorrect(
                entity.StartDate, entity.EndDate, model.StartTime);
            entity.EndTime = IsEndTimeCorrect(
                model.StartTime, entity.EndDate, model.EndTime);

            // REPOSITORY CALLS HERE
            try
            {
                await _repository.Update(entity);
            }
            catch (Exception e)
            {
                throw new LetSkoleException(e.Message, 400);
            }
        }

        public async Task Delete(string userId, int id)
        {
            // RETRIEVE OBJECT HERE
            var entity = await _repository.GetItemById(id);
            if (entity == null) throw new LetSkoleException(404);
            if (entity.UserId != userId) throw new LetSkoleException(403);

            // REPOSITORY CALLS HERE
            await _repository.Delete(entity);
        }

        public async Task<IEnumerable<ActivityResponse>> GetEnumerableByUserId(string userId)
        {
            var collection = await _repository.GetCollectionByUserId(userId);

            return collection.Select(
                e => _mapper.Map<Activity, ActivityResponse>(e)
            ).ToList();
        }

        // NOTE: Below here are defined **private** methods

        private static DateTime IsStartDateCorrect(DateTime? startDate)
        {
            var today = DateTime.Today;
            var date = startDate ?? today;
            if (today.CompareTo(date) >= 0)
                return today;
            return date - date.TimeOfDay;
        }

        private static DateTime? IsEndDateCorrect(DateTime startDate, DateTime? endDate)
        {
            if (endDate == null) return null;
            var date = endDate ?? startDate;
            date -= date.TimeOfDay;
            if (startDate.CompareTo(date) < 0) return date;
            const string message = "Bad Request: EndDate cannot be earlier than StartDate";
            throw new LetSkoleException(message, 400);
        }

        private static DateTime IsStartTimeCorrect(
            DateTime startDate, DateTime? endDate, DateTime startTime)
        {
            var auxEndDate = endDate ?? DateTime.MaxValue;
            if (startDate.CompareTo(startTime) < 0 &&
                startTime.CompareTo(auxEndDate) < 0)
                return startTime;
            const string message =
                "Bad Request: StartTime should be between StartDate and EndDate";
            throw new LetSkoleException(message, 400);
        }

        private static DateTime IsEndTimeCorrect(
            DateTime startTime, DateTime? endDate, DateTime endTime)
        {
            var auxEndDate = endDate ?? DateTime.MaxValue;
            if (startTime.CompareTo(endTime) < 0 &&
                endTime.CompareTo(auxEndDate) < 0)
                return endTime;
            const string message =
                "Bad Request: EndTime should be between StartTime and EndDate";
            throw new LetSkoleException(message, 400);
        }
    }
}