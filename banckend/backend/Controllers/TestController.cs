using Microsoft.AspNetCore.Mvc;

namespace banckend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TestController : ControllerBase
{
    [HttpGet]
    public IActionResult Get()
    {
        return Ok(new{message = "Its Working"});
    }
}