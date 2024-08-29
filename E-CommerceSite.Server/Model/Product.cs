using System.ComponentModel.DataAnnotations;

namespace E_CommerceSite.Server.Model
{
    public class Product
    {
        public int ProductId { get; set; }

        public string selectedCategory { get; set; }
        [Required]
        public string ProductName { get; set; }
    

        [Required]
        public decimal Price { get; set; }

        public decimal Discount { get; set; }

        public decimal DiscountedPrice { get; set; }

        [Required]
        public string Description { get; set; }

        public string ImagePath { get; set; }

        public bool IsActive { get; set; }
    }
}
