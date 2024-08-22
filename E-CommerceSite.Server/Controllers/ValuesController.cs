using E_CommerceSite.Server.Data;
using E_CommerceSite.Server.Model;
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
        private readonly ApplicationDbContext _context;
        private readonly IWebHostEnvironment _env;
        private readonly EmailService _emailService;

        public ValuesController(IAuthService authService, ApplicationDbContext context, IWebHostEnvironment env, EmailService emailService)
        {
            _authService = authService;
            _env = env ?? throw new ArgumentNullException(nameof(env));
            _context = context ?? throw new ArgumentNullException(nameof(context));
            _emailService = emailService;
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
                    await _emailService.SendTestEmailAsync();
                    return Ok(new { Token = result.Token });
                }
                else
                {
                    return Unauthorized(new { Message = "Invalid credentials" });
                }
            }

            return BadRequest(new { Message = "Invalid data" });
        }



        [HttpPost("AddProduct")]
        public async Task<IActionResult> AddProduct([FromForm] ProductDTO productDTO)
        {
            if (ModelState.IsValid)
            {

                if (string.IsNullOrEmpty(_env.WebRootPath))
                {
                    return StatusCode(500, "WebRootPath is not set. Ensure that 'wwwroot' directory exists.");
                }

                // Save the image file if it exists
                string imagePath = null;
                if (productDTO.Image != null)
                {
                    var fileName = Guid.NewGuid().ToString() + Path.GetExtension(productDTO.Image.FileName);
                    var uploadsFolder = Path.Combine(_env.WebRootPath, "uploads");
                    var filePath = Path.Combine(uploadsFolder, fileName);

                    // Ensure the uploads folder exists
                    Directory.CreateDirectory(uploadsFolder);

                    using (var stream = new FileStream(filePath, FileMode.Create))
                    {
                        await productDTO.Image.CopyToAsync(stream);
                    }
                    imagePath = "/uploads/" + fileName;
                }

                // Calculate the discounted price
                var discountedPrice = productDTO.Price - (productDTO.Price * productDTO.Discount / 100);

                // Create a new product instance
                var product = new Product
                {
                    selectedCategory = productDTO.selectedCategory,
                    ProductName = productDTO.ProductName,
                    Price = productDTO.Price,
                    Discount = productDTO.Discount,
                    DiscountedPrice = discountedPrice,
                    Description = productDTO.Description,
                    ImagePath = imagePath,
                    IsActive = true
                };

                // Save the product to the database
                _context.Products.Add(product);
                await _context.SaveChangesAsync();

                return Ok(new { message = "Product added successfully!" });
            }

            return BadRequest(ModelState);
        }



        [HttpGet("GetCategories")]
        public async Task<ActionResult<IEnumerable<Product>>> GetCategories()
        {
            try
            {
                var products = await _context.Products.ToListAsync();
                return Ok(products);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpPost("AddToCart")]
        public async Task<IActionResult> AddToCart([FromBody] CartItem cartItem)
        {
            if (cartItem == null)
            {
                return BadRequest("Invalid cart item");
            }

            _context.CartItems.Add(cartItem);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Item added to cart" });
        }

        [HttpDelete("RemoveFromCart/{id}")]
        public async Task<IActionResult> RemoveFromCart(int id)
        {
            var item = await _context.CartItems.FindAsync(id);
            if (item == null)
            {
                return NotFound("Cart item not found");
            }

            _context.CartItems.Remove(item);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Item removed from cart" });
        }

        [HttpDelete("EmptyCart")]
        public async Task<IActionResult> EmptyCart()
        {
            var items = await _context.CartItems.ToListAsync();
            _context.CartItems.RemoveRange(items);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Cart emptied" });
        }

        [HttpGet("GetCart")]
        public async Task<ActionResult<IEnumerable<CartItem>>> GetCart()
        {
            var items = await _context.CartItems.ToListAsync();
            return Ok(items);
        }
    }



    //[HttpPost ("cart")]
    //public async Task<IActionResult> cart([FromForm] Product cartItem)
    //{
    //    if (cartItem == null)
    //    {
    //        return BadRequest("Invalid cart item");
    //    }

    //    _context.CartItems.Add(cartItem);
    //    await _context.SaveChangesAsync();

    //    return Ok(new { message = "Item added to cart" });
    //}








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
