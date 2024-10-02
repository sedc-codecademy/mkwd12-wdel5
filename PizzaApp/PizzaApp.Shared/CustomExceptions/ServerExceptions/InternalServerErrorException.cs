namespace PizzaApp.Shared.CustomExceptions.ServerExceptions
{
    public class InternalServerErrorException :Exception
    {
        public InternalServerErrorException(string message) : base(message) { }
    }
}
