using LetSkole.DataAccess;
using LetSkole.Dto;
using LetSkole.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using LetSkole.Entities.Indentity;

namespace LetSkole.Services
{
    public class ActivityService : IActivityService
    {

        private readonly IActivityRepository _repository;
        private readonly IUserRepository _userRepository;
        
        public ActivityService(IActivityRepository repository, IUserRepository userRepository)
        {
            _repository = repository;
            _userRepository = userRepository;
        }

        public async Task Create(ActivityDto entity)
        {
            DateTime now = DateTime.Now;
            DateTime inicio = DateTime.MinValue;
            entity.StartDate = new DateTime(now.Year, now.Month, now.Day);

            //Validar user
            ApplicationUser user = await _userRepository.GetItem(entity.UserId);
            if (user == null)
            {
                throw new Exception("User not found");
            }

            //Buscamos errores
                int res = DateTime.Compare(entity.StartDate, entity.EndDate);
            if (res >= 0)
            {
                throw new Exception("Date invalid");
            }

            if (entity.StartTime != inicio && entity.EndTime != inicio)
            {
                //Puedo comparar
                    if (DateTime.Compare(entity.StartTime, entity.EndTime) >= 0)
                {
                    throw new Exception("Date invalid");
                }

                if (DateTime.Compare(entity.StartDate, entity.StartTime) > 0)
                {
                    throw new Exception("Date invalid");
                }
            }

            if (entity.Name == "" || entity.Name == null)
            {
                throw new Exception("A name is necessary");
            }

           await _repository.Create(new Activity
            {
                ApplicationUserId = entity.UserId, //validar el user id
                Name = entity.Name,
                Description = entity.Description,
                StartDate = entity.StartDate, // Tiempo del sistema a las 0:0:0 horas
                EndDate = entity.EndDate,
                Completed = false, // Siempre inicia en falso
                StartTime = entity.StartTime,
                EndTime = entity.EndTime,
            });
        }

        public async Task Delete(int id)
        {
            await _repository.Delete(id);
        }

        public async Task<ICollection<ActivityDto>> GetCollection(string filter)
        {
            var Collection = await _repository.GetActivities(filter ?? string.Empty);
            return  Collection.Select(c => new ActivityDto
            {
                Id = c.Id,
                UserId = c.ApplicationUserId,
                Name = c.Name,
                Description = c.Description,
                StartDate = c.StartDate,
                EndDate = c.EndDate,
                Completed = c.Completed,
                StartTime = c.StartTime,
                EndTime = c.EndTime
            }).ToList();
        }


        public async Task<ICollection<ActivityDto>> GetCollectionUserID(int id)
        {
            var Collection = await _repository.GetCollectionByID(id);
            return Collection.Select(c => new ActivityDto
            {
                Id = c.Id,
                UserId = c.ApplicationUserId,
                Name = c.Name,
                Description = c.Description,
                StartDate = c.StartDate,
                EndDate = c.EndDate,
                Completed = c.Completed,
                StartTime = c.StartTime,
                EndTime = c.EndTime
            }).ToList();
        }







        public async Task<ActivityDto> GetItem(int id)
        {
            Activity activity = await _repository.GetItem(id);
            ActivityDto activityDto = new ActivityDto();

            activityDto.Id = activity.Id;
            activityDto.UserId = activity.ApplicationUserId;
            activityDto.Name = activity.Name;
            activityDto.Description = activity.Description;
            activityDto.StartDate = activity.StartDate;
            activityDto.EndDate = activity.EndDate;
            activityDto.Completed = activity.Completed;
            activityDto.StartTime = activity.StartTime;
            activityDto.EndTime = activity.EndTime;
            return activityDto;
        }

        public async Task Update(ActivityDto entity)
        {
            
            Activity activity = await _repository.GetItem(entity.Id);
            DateTime inicio = DateTime.MinValue;
            
            if (activity == null)
            {
                throw new Exception("Id activity doesn't exists");
            }


            // Falta comprobar si el usuario existe
            ApplicationUser user = await _userRepository.GetItem(entity.UserId);
            if (user == null)
            {
                throw new Exception("El id del usuario no existe");
            }
            


            // Nombre
            if (entity.Name == "" || entity.Name == null)
            {
                activity.Name = activity.Name;
            }
            else
            {
                activity.Name = entity.Name;
            }

            //Description
                if (entity.Description == "" || entity.Description == null)
            {
                activity.Description = activity.Description;
            }
            else
            {
                activity.Description = entity.Description;
            }


            if (entity.EndDate == inicio)
            {
                activity.EndDate = activity.EndDate;
            }
            else
            {
                DateTime auxEndDate = entity.EndDate;
                int resCom = DateTime.Compare(activity.StartDate, auxEndDate);
                if (resCom < 0)
                {
                    //Modifico
                        activity.EndDate = entity.EndDate;
                }
                else
                {
                    throw new Exception("Invalid date");
                }



            }

            activity.Completed = entity.Completed;


            DateTime auxStartDate = entity.StartDate;
            DateTime auxStarTime = entity.StartTime;

            int res3 = DateTime.Compare(auxStartDate, entity.StartTime);
            if (res3 >= 0)
            {
                throw new Exception("Invalid date");
            }

            DateTime auxEndDate2 = entity.EndDate;
            res3 = DateTime.Compare(entity.StartTime, auxEndDate2);
            if (res3 >= 0)
            {
                throw new Exception("Invalid date");
            }

            res3 = DateTime.Compare(auxStartDate, entity.EndTime);
            if (res3 >= 0)
            {
                throw new Exception("Invalid date");
            }

            res3 = DateTime.Compare(entity.EndTime, auxEndDate2);
            if (res3 >= 0)
            {
                throw new Exception("Invalid date");
            }

            res3 = DateTime.Compare(entity.StartTime, entity.EndTime);
            if (res3 >= 0)
            {
                throw new Exception("Invalid date");
            }

            activity.StartDate = entity.StartDate;
            activity.StartTime = entity.StartTime;
            activity.EndDate = entity.EndDate;
            activity.EndTime = entity.EndTime;
            activity.Description = entity.Description;
            activity.Id = entity.Id;
            activity.Name = entity.Name;
            activity.ApplicationUserId = entity.UserId;

            await _repository.Update(activity);
        }


    }
}