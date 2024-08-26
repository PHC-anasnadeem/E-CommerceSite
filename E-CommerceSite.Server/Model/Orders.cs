namespace E_CommerceSite.Server.Model
{
    public class Orders
    {
        public int OrderId { get; set; }
        public int UserId { get; set; }
        public int ProductId { get; set; }
        public Product Product { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Address { get; set; }
        public string Phone { get; set; }
        public string CountryCode { get; set; }
        public string PaymentMethod { get; set; }
        public int Quantity { get; set; }
        public decimal DiscountedPrice { get; set; }
        public string ImagePath { get; set; }
    }


}
