using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BaseApiController:ControllerBase
    {
        private IMediator _mediator;
        //pritected meen you can use it in any drived classes and baseapi itself
        protected IMediator Mediator => _mediator ??= HttpContext.RequestServices.GetService<IMediator>();

    }
}