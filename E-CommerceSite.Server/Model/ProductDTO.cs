namespace E_CommerceSite.Server.Model
{
    public class ProductDTO
    {
        public string selectedCategory { get; set; }
        public string? ProductName { get; set; }
       
        public decimal Price { get; set; }
        public decimal Discount { get; set; }
        public string? Description { get; set; }
        public IFormFile? Image { get; set; }
    }


}
