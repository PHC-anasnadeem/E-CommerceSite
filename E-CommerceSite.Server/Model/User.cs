using System.ComponentModel.DataAnnotations;


namespace E_CommerceSite.Server.Model
{
    public class User
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public DateTime Created { get; set; }
        public bool IsActive { get; set; }
        public string PhoneNumber { get; set; }
    }
}
