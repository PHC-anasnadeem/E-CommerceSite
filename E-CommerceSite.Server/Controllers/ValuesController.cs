
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace E_CommerceSite.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ValuesController : ControllerBase
    {
    
        private readonly IAuthService _authService;

        public ValuesController(IAuthService authService)
        {
            _authService = authService;
        }

        // POST: api/values/login
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            if (ModelState.IsValid)
            {
                var result = await _authService.AuthenticateAsync(request.Username, request.Password);

                if (result.IsSuccess)
                {
                    return Ok(new { Token = result.Token });
                }
                else
                {
                    return Unauthorized(new { Message = "Invalid credentials" });
                }
            }

            return BadRequest(new { Message = "Invalid data" });
        }
    }

    public class LoginRequest
    {
        public string Username { get; set; }
        public string Password { get; set; }
    }


    public interface IAuthService
    {
        Task<AuthResult> AuthenticateAsync(string username, string password);
    }


    public class AuthResult
    {
        public bool IsSuccess { get; set; }
        public string Token { get; set; }
    }
}

