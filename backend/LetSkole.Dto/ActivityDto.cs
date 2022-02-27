using System;

namespace LetSkole.Dto
{
    public class ActivityRequestForPost
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
    }

    public class ActivityRequestForPut
    {
        public int Id { get; set; }
        public string Description { get; set; }
        public DateTime? EndDate { get; set; }
        public bool Completed { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
    }

    public class ActivityResponse
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public bool Completed { get; set; }
        public DateTime? StartTime { get; set; }
        public DateTime? EndTime { get; set; }
        public string UserId { get; set; }
    }
}