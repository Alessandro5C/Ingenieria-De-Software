namespace LetSkole.Dto
{
    public class UxgRequestForPost
    {
        public string UserEmail { get; set; }
        public int GroupId { get; set; }
    }

    public class UxgRequestForPut
    {
        public string UserId { get; set; }
        public int GroupId { get; set; }
        public short Grade { get; set; }
    }

    public class UxgResponse
    {
        public string UserId { get; set; }
        public AppUserResponse User { get; set; }
        public int GroupId { get; set; }
        public short? Grade { get; set; }
    }
}