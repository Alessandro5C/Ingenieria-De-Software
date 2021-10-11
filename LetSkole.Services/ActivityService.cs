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


        public ActivityService (IActivityRepository repository)
        {
            _repository = repository;
        }


        public void Create (ActivityDto entity)
        {
            DateTime auxStartDate = DateTime.Now;
            DateTime auxEndDate = entity.EndDate;

            DateTime auxStartTime = entity.StartTime;
            DateTime auxEndTime = entity.EndTime;

            // Buscamos errores
            int res = DateTime.Compare(auxStartDate, auxEndDate);
            if (res >= 0)
            {
                throw new Exception("Fecha invalida");
                return;
            }

            DateTime inicio = DateTime.MinValue;

            if (auxStartTime != inicio && auxEndTime != inicio)
            {
                // Puedo comparar 
                int res1 = DateTime.Compare(auxStartTime, auxEndTime);
                if (res1 >= 0)
                {
                    throw new Exception("Fecha invalida");
                    return;
                }

                int res2 = DateTime.Compare(auxStartDate, auxStartTime);
                if (res2 > 0)
                {
                    throw new Exception("Fecha invalida");
                    return;
                }
            }

            if (entity.Name == "")
            {
                throw new Exception("Falta ingresar nombre");
                return;
            }
            // No encontré errores
            _repository.Create(new Activity
            {
                UserId = entity.UserId, //validar el user id
                Name = entity.Name,
                Description = entity.Description,
                StartDate = DateTime.Now,  // Tiempo del sistema
                EndDate = entity.EndDate,
                Completed = false, // Siempre inicia en falso
                StartTime = entity.StartTime,
                EndTime = entity.EndTime,
            });


            //if (auxStartTime == "0:0:0" && auxEndTime == "0:0:0")
            //{
            //    // no comparo
            //}
            //else
            //{
            //    int aux = DateTime.Compare(auxStartDate, auxEndDate);
            //    if (aux < 0)
            //    {
            //        // Crea
            //    }
            //}

            //int res = DateTime.Compare(auxStartDate, auxEndDate);
            //if (res < 0)
            //{
            //    // crear
            //    _repository.Create(new Activity
            //    {
            //        UserId = entity.UserId, //validar el user id
            //        Name = entity.Name,
            //        Description = entity.Description,
            //        StartDate = DateTime.Now,  // Tiempo del sistema
            //        EndDate = entity.EndDate,
            //        Completed = false, // Siempre inicia en falso
            //        StartTime = entity.StartTime,
            //        EndTime = entity.EndTime,
            //    });
            //}
            //else
            //{
            //    // botamos error

            //}
        }

        public void Delete (int id)
        {
            _repository.Delete(id);
        }

        public ICollection<ActivityDto> GetCollection (string filter)
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
                StartTime = c.StartTime,
                EndTime = c.EndTime
            }).ToList();
        }

        public ActivityDto GetItem (int id)
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
            activityDto.StartTime = activity.StartTime;
            activityDto.EndTime = activity.EndTime;
            return activityDto;
        }

        public void Update (ActivityDto entity)
        {
            Activity activity = _repository.GetItem(entity.Id);

            activity.UserId = entity.UserId;
            activity.Name = entity.Name;
            activity.Description = entity.Description;
            activity.StartDate = entity.StartDate;
            activity.EndDate = entity.EndDate;
            activity.Completed = entity.Completed;
            activity.StartTime = entity.StartTime;
            activity.EndTime = entity.EndTime;

            _repository.Update(activity);
        }
    }
}
