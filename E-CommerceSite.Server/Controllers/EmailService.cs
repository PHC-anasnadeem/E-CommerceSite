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

        public async Task SendTestEmailAsync()
        {
            try
            {
                await _emailUtility.SendEmailAsync(
                    from: "anas.nadeem@phc.org.pk",
                    to: "tayyabrajpoot122@gmail.com",
                    subject: "Test Email",
                    body: "<h1>Hello World!</h1><p>This is a test email.</p>",
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
