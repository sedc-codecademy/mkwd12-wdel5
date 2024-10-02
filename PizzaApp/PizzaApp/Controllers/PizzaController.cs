using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using PizzaApp.Domain.Entities;
using PizzaApp.Dtos.PizzaDtos;
using PizzaApp.Services.Abstractions;
using PizzaApp.Shared.CustomExceptions.PizzaExceptions;
using PizzaApp.Shared.CustomExceptions.ServerExceptions;
using System.Security.Claims;

namespace PizzaApp.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    //public class PizzaController(IPizzaService pizzaService,) : BaseController
    //{
    //    private readonly IPizzaService _pingService = pizzaService;
    //}

    public class PizzaController : BaseController
    {
        private readonly IPizzaService _pizzaService;

        public PizzaController(IPizzaService pizzaService)
        {
            _pizzaService = pizzaService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                var response = await _pizzaService.GetAllPizzas();
                return Response(response);
            }
            catch (PizzaDataException ex)
            {
                return BadRequest (ex.Message);
            }
            catch(InternalServerErrorException ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            try
            {
                var response = await _pizzaService.GetPizzaById(id);
                return Response(response);
            }
            catch (PizzaDataException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (InternalServerErrorException ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPost]
        public async Task<IActionResult> CreatePizza([FromBody] AddPizzaDto addPizzaDto)
        {
            try
            {
                var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                if (userId == null) return BadRequest("No user identified");
                var response = await _pizzaService.CreatePizza(userId, addPizzaDto);
                return Response(response);
            }
            catch (PizzaDataException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (InternalServerErrorException ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdatePizza(int id, [FromBody] UpdatePizzaDto updatePizzaDto)
        {
            try
            {
                var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                if (userId == null) return BadRequest("No user identified");
                var response = await _pizzaService.UpdatePizza(userId, id, updatePizzaDto);
                return Response(response);
            }
            catch (PizzaDataException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (InternalServerErrorException ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePizza(int id)
        {
            try
            {
                var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                if (userId == null) return BadRequest("No user identified");
                var response = await _pizzaService.DeletePizza(userId, id);
                return Response(response);
            }
            catch (PizzaDataException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (InternalServerErrorException ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }
}
