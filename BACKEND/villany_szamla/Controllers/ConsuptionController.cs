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
        public IEnumerable<Consuption> Get(double price,string input)
        {
            //string input = "2020,2021,2022,2023,2024-108,69,217,396,265-69,223,190,400,230-171,128,152,16,310-114,174,154,136,380-226,32,70,24,38-307,154,33,275,130-242,284,6,384,113-296,381,124,28,100-278,30,333,326,182-300,37,188,79,369-171,280,343,304,388-33,210,318,10,303";
            return Enumerable.Range(1, 1).Select(index => new Consuption(price,input)
            ).ToArray();
        }
    }
}
