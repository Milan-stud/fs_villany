using Microsoft.AspNetCore.Mvc;

namespace villany_szamla.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ConsuptionController: ControllerBase
    {
        private readonly ILogger<ConsuptionController> _logger;

        public ConsuptionController(ILogger<ConsuptionController> logger)
        {
            _logger = logger;
        }

        [HttpGet(Name = "GetConsuption")]
        public IEnumerable<Consuption> Get(double price)
        {
            string input = "2000,2001\n1,2,3,4,5,6,7,8,9,10,11,12\n1,2,3,4,5,6,7,8,9,10,11,12";
            return Enumerable.Range(1, 1).Select(index => new Consuption
            {
                StartYear = Consuption.GetFirstYear(input),
                ListOfYears = Consuption.GetListOfYears(price,input),
                }
            ).ToArray();
        }
    }
}
