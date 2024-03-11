using Microsoft.AspNetCore.Mvc;
using Parati.Dashboard.Services;

namespace Parati.Dashboard.WebApi.Controllers
{
    [Route("api/gptw")]
    [ApiController]
    public class GPTWController : Controller
    {
        private readonly IGPTWService _gptwService;

        public GPTWController(IGPTWService gptwService)
        {
            _gptwService = gptwService;
        }

        [HttpGet]
        public async Task<IActionResult> GetGPTW()
        {
            try
            {
                var result = await _gptwService.GetGPTW();
                return Ok(result);
            }
            catch (Exception ex)
            {
                // TODO: Log.Error(ex, "Failed to get GPTW information.");
                return StatusCode(500, "An error occurred while processing your request. Please try again later. " + ex);
            }
        }
    }
}