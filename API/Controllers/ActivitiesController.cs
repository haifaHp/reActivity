using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Activities;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    public class ActivitiesController : BaseApiController
    {
       
        [HttpGet]
        public async Task<ActionResult<List<Activity>>> GetActivities()
        {
            return await Mediator.Send(new List.Qurey());
        }

        [HttpGet("{id}")] //activities/id
        public async Task<ActionResult<Activity>> GetActivity(Guid id)
        {

            return  Ok();
        }
        //  [HttpGet("{id}")] //activities/id
        // public async Task<ActionResult<Activity>> GetActivitypro(Guid id)
        // {

        //     return await _context.Activities.FindAsync(id);
        // }

    }
}