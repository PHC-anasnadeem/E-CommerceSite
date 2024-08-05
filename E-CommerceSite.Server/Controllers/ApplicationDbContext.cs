namespace E_CommerceSite.Server.Data
{
    using global::E_CommerceSite.Server.Model;
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
            public DbSet<Product> AdminProducts { get; set; }
        }


    
    }

}
