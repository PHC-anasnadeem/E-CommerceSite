
using E_CommerceSite.Server.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
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

        [AllowAnonymous]
        [HttpPost("Login")]
        public async Task<IActionResult> Login(string username, string password)
        {
            if (ModelState.IsValid)
            {
                var result = await _authService.AuthenticateAsync(username, password);

                if (result.IsSuccess)
                {
                    return Ok(new { Token = result.Token });
                    //return Ok();
                }
                else
                {
                    return Unauthorized(new { Message = "Invalid credentials" });
                }
            }

            return BadRequest(new { Message = "Invalid data" });
        }




    }

    public class AuthService : IAuthService
    {
        private readonly ApplicationDbContext _context;
        private readonly string _secretKey;

        public AuthService(ApplicationDbContext context)
        {
            _context = context;
            _secretKey = "ecommercesiteforzubairtraders123456789";
        }

        public async Task<AuthResult> AuthenticateAsync(string username, string password)
        {
            var user = await _context.Users
                .FirstOrDefaultAsync(u => u.Username == username && u.Password == password);

            if (user != null)
            {
                var token = GenerateJwtToken(user.Username);
                return new AuthResult
                {
                    IsSuccess = true,
                    Token = token
                };
            }

            return new AuthResult
            {
                IsSuccess = false,
                Token = null
            };
        }


        private string GenerateJwtToken(string username)
        {
            var claims = new[]
            {
            new Claim(JwtRegisteredClaimNames.Sub, username),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
        };

            var key = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(_secretKey));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddHours(1),
                SigningCredentials = creds
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
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

