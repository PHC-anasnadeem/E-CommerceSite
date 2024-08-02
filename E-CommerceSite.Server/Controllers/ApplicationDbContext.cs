namespace E_CommerceSite.Server.Data
{
    using Microsoft.EntityFrameworkCore;

    namespace E_CommerceSite.Server.Controllers
    {
        public class ApplicationDbContext : DbContext
        {
            public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
                : base(options)
            {
            }

            public DbSet<User> Users { get; set; }
        }

        public class User
        {
            public int Id { get; set; }
            public string Username { get; set; }
            public string Password { get; set; }
        }
    }

}
