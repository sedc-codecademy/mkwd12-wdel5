using AutoMapper;
using Microsoft.AspNetCore.Identity;
using PizzaApp.Domain.Entities;
using PizzaApp.Dtos.UserDtos;
using PizzaApp.Services.UserServices.Abstractions;
using PizzaApp.Shared.CustomExceptions.UserExceptions;
using PizzaApp.Shared.Responses;

namespace PizzaApp.Services.UserServices.Implementations
{
    public class UserService : IUserService
    {
        private readonly IMapper _mapper;
        private readonly UserManager<User> _userManager;

        public UserService(IMapper mapper, UserManager<User> userManager)
        {
            _mapper = mapper;
            _userManager = userManager;
        }

        public Task<CustomResponse> DeleteUserAsync(string id)
        {
            throw new NotImplementedException();
        }

        public Task<CustomResponse> GetAllUsersAsync()
        {
            throw new NotImplementedException();
        }

        public Task<CustomResponse<UserDto>> GetUsersByIdAsync(string id)
        {
            throw new NotImplementedException();
        }

        public async Task<CustomResponse<LoginUserResponseDto>> LoginUserAsync(LoginUserRequestDto request)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(request?.Username))
                    throw new UserDataException("Username is a required field");

                if (string.IsNullOrWhiteSpace(request?.Password))
                    throw new UserDataException("Password is a required field");

                var user = await _userManager.FindByNameAsync(request.Username);
                if (user == null)
                    return new("user doesnt exist");

                bool IsPasswordValid = await _userManager.CheckPasswordAsync(user, request.Password);
                if (!IsPasswordValid)
                    return new("invalid password");

                //to be continued on the next class...
                //var token = await 
                throw new NotImplementedException(); // za da ne puka
            }
            catch (UserDataException ex)
            {
                throw new UserDataException(ex.Message);
            }
            catch (UserNotFoundException ex)
            {
                throw new UserNotFoundException(ex.Message);
            }
        }

        public async Task<CustomResponse<RegisterUserResponseDto>> RegisterUserAsync(RegisterUserRequestDto request)
        {
            try
            {
                if (string.IsNullOrEmpty(request.Username))
                    throw new UserDataException("username must not be empty");

                if(string.IsNullOrEmpty(request.Password))
                    throw new UserDataException("password must not be empty");

                if (string.IsNullOrEmpty(request.Email))
                    throw new UserDataException("email must not be empty");

                var user = new UserDto { UserName = request.Username, Email = request.Email };
                var result = await _userManager.CreateAsync(user, request.Password);

                if (!result.Succeeded)
                    return new(result.Errors.Select(x => x.Description));

                return new(new RegisterUserResponseDto
                {
                    Id = user.Id,
                    Username = user.UserName,
                    Email = user.Email,
                });
            }
            catch (UserDataException ex)
            {
                throw new UserDataException(ex.Message);
            }
        }

        public Task<CustomResponse<UpdateUserDto>> UpdateUserAsync(string id, UpdateUserDto updatedUser)
        {
            throw new NotImplementedException();
        }
    }
}
