namespace LetSkole.Dto
{
    public class LetSkoleResponseBase
    {
        public string Status { get; set; }
        public int Code { get; set; }

        protected const string StatusSuccess = "success";
        protected const string StatusError = "error";

        public static LetSkoleResponseBase Success() => new LetSkoleResponseBase
        {
            Status = StatusSuccess, Code = 200
        };

        public static LetSkoleResponseBase Error(int code) => new LetSkoleResponseBase
        {
            Status = StatusError, Code = code
        };
    }

    public class LetSkoleResponse : LetSkoleResponseBase
    {
        public string Message { get; set; } = string.Empty;

        public static LetSkoleResponseBase Error(string message) => new LetSkoleResponse
        {
            Status = StatusError, Message = message
        };

        public static LetSkoleResponseBase Error(string message, int code) => new LetSkoleResponse
        {
            Status = StatusError, Message = message, Code = code
        };
    }

    public class LetSkoleResponse<TData> : LetSkoleResponseBase
    {
        public TData Data { get; set; }

        public static LetSkoleResponseBase Success(TData data) => new LetSkoleResponse<TData>
        {
            Status = StatusSuccess, Code = 200, Data = data
        };
    }
}