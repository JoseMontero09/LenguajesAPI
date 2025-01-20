using Microsoft.AspNetCore.Mvc;

namespace APISandbox.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WeatherForecastController : ControllerBase
    {
        private static readonly string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        private readonly ILogger<WeatherForecastController> _logger;

        public WeatherForecastController(ILogger<WeatherForecastController> logger)
        {
            _logger = logger;
        }

        [HttpGet(Name = "GetWeatherForecast")]
        public IEnumerable<WeatherForecast> Get()
        {
            return Enumerable.Range(1, 5).Select(index => new WeatherForecast
            {
                Date = DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
                TemperatureC = Random.Shared.Next(-20, 55),
                Summary = Summaries[Random.Shared.Next(Summaries.Length)]
            })
            .ToArray();
        }
        [Route("[action]/{date}")]
        [HttpGet]
        public WeatherForecast GetByDate(DateOnly date)
        {
            var rng = new Random();
            return new WeatherForecast
            {
                Date = date,
                TemperatureC = rng.Next(-20, 55),
                Summary = Summaries[rng.Next(Summaries.Length)]
            };
        }


        [Route("[action]")]
        [HttpPost]
        public IEnumerable<WeatherForecast> Post(WeatherForecast weatherForecast)
        {
            List<WeatherForecast> weatherForecasts = Get().ToList();
            weatherForecasts.Add(weatherForecast);
            return weatherForecasts;

        }

        [Route("[action]")]
        [HttpPatch]
        public WeatherForecast Patch(WeatherForecast weatherForecast)
        {
            return new WeatherForecast
            {
                Date = weatherForecast.Date,
                TemperatureC = weatherForecast.TemperatureC,
                Summary = weatherForecast.Summary
            };
        }

        [Route("[action]")]
        [HttpPut]
        public IEnumerable<WeatherForecast> Put(WeatherForecast newWeatherForecast)
        {
            List<WeatherForecast> weatherForecasts = Get().ToList();
            WeatherForecast oldForecast = new WeatherForecast();

            foreach (var item in weatherForecasts)
            {
                if (item.Date.ToString() == "2025-01-21" && item.Summary == "Cool")
                {
                    oldForecast = item;
                    weatherForecasts.Remove(oldForecast);
                    weatherForecasts.Add(newWeatherForecast);
                }
            }
            return weatherForecasts;

        }
    }
}
