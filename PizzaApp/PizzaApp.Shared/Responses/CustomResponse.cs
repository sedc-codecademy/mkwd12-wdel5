namespace PizzaApp.Shared.Responses
{
    public class CustomResponse
    {
        public bool IsSuccessfull { get; set; } = false;
        public IEnumerable<string> Errors { get; protected set; } = new List<string>();

        public static CustomResponse Succes => new(true);
        public CustomResponse(params string[] errors) => Errors = errors;
        public CustomResponse(IEnumerable<string> errors) => Errors = errors;
        public CustomResponse(bool isSuccessfull) => IsSuccessfull = isSuccessfull;
    }

    public class CustomResponse<TResult> : CustomResponse where TResult : new()
    {
        public TResult? Result { get; set; } = default;
        public CustomResponse(TResult? result) 
        {
            IsSuccessfull = true;
            Result = result;
        }

        public CustomResponse(params string[] errors) : base(errors) { }
        public CustomResponse(IEnumerable<string> errors) : base(errors) { }
    }
}
