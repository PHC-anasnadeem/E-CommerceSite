namespace E_CommerceSite.Server.Model
{
    public class CartItem
    {
        public int Id { get; set; }


        public string? ProductName { get; set; }
        public string? ImagePath { get; set; }
        public string? Description { get; set; }
        public decimal Price { get; set; }
        public int Quantity { get; set; }
        public decimal Total => Price * Quantity; // Calculated property
    }
}
