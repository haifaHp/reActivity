using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Details
    {
        //choose witch one you need qyery or command
        //we use query bcause wefetching data and not updating the database
        //then we use irequest interface once again<we returning from this a singular activity>
        // then we must specify what kind of{} id yoo want to retrive and then we have axecc to this inside handler}
//use handler <what is the request,what must be the respons>
//impeliment the handler
//use async
//we also need too create constractor or handler
//initial field from parameter for context

        public class Query:IRequest<Activity>{
            public Guid Id{get;set;}
        }
        public class Handler : IRequestHandler<Query, Activity>
        {
        private readonly DataContext _context;
            public Handler(DataContext context)
            {
            _context = context;
            }

            public async Task<Activity> Handle(Query request, CancellationToken cancellationToken)
            { 

              
               return await _context.Activities.FindAsync(request.Id);
            }
        }

    }
}