using PizzaApp.Dtos.UserDtos;
using PizzaApp.Shared.Responses;

namespace PizzaApp.Services.UserServices.Abstractions
{
    public interface IUserService
    {
        Task<CustomResponse<RegisterUserResponseDto>> RegisterUserAsync(RegisterUserRequestDto request);
        Task<CustomResponse<LoginUserResponseDto>> LoginUserAsync(LoginUserRequestDto request);
        Task<CustomResponse> GetAllUsersAsync();
        Task<CustomResponse<UserDto>> GetUsersByIdAsync(string id);
        Task<CustomResponse<UpdateUserDto>> UpdateUserAsync(string id, UpdateUserDto updatedUser);
        Task<CustomResponse> DeleteUserAsync(string id);
    }
}
