using global::E_CommerceSite.Server.Model;
using System.Threading.Tasks;

namespace E_CommerceSite.Server.Controllers
{

    public class EmailService
    {
        private readonly EmailUtility _emailUtility;

        public EmailService(EmailUtility emailUtility)
        {
            _emailUtility = emailUtility;
        }

        public async Task SendTestEmailAsync(string toEmailAddress)
        {
            try
            {
                await _emailUtility.SendEmailAsync(
                    from: "anas.nadeem@phc.org.pk",
                    to: toEmailAddress,
                    subject: "Order Confirmation",
                    body: "<h1>Thank you for your order!</h1><p>Your order has been successfully placed. We will process it shortly.</p>",
                    isBodyHtml: true
                );
                Console.WriteLine("Email sent successfully.");
            }
            catch (Exception ex)
            {
                Console.WriteLine("An error occurred while sending the email:");
                Console.WriteLine($"Message: {ex.Message}");
                Console.WriteLine($"Stack Trace: {ex.StackTrace}");
                throw; 
            }
        }
    }



}
