using System.ComponentModel.DataAnnotations;


namespace E_CommerceSite.Server.Model
{
    public class User
    {
        
        public int Id { get; set; }
        public string Username { get; set; }

        public string Password { get; set; }
     
    }
}
