namespace PizzaApp.Dtos.UserDtos
{
    public class LoginUserResponseDto
    {
        public string Token { get; set; }
        public DateTime ValidTo { get; set; }
    }
}
