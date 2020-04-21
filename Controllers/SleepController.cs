using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SleepTracker.Models;

namespace SleepTracker.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SleepController : ControllerBase
    {
        private readonly DatabaseContext _context;

        public SleepController(DatabaseContext context)
        {
            _context = context;
        }

        // GET: api/Sleep
        [HttpGet]
        public async Task<ActionResult<IEnumerable<SleepCounter>>> GetSleepCounters()
        {
            return await _context.SleepCounters.ToListAsync();
        }

        [HttpGet("thisweek")]
        public async Task<ActionResult<IEnumerable<SleepCounter>>> GetSleepCountersForThisWeek()
        {
            // TODO, Add a `Where` statement to limit which SleepCounters we return
            //Where the past seven days including today
            // The days have to be equal to or less than six days old
            // Where(sleepCounter => sleepCounter.TimeStart(e=>e =< 6 days from  Datetime.Now))
            return await _context.SleepCounters.ToListAsync();
        }

        // GET: api/Sleep/5
        [HttpGet("{id}")]
        public async Task<ActionResult<SleepCounter>> Get2SleepCounter(int id)
        {
            var sleepCounter = await _context.SleepCounters.FindAsync(id);

            if (sleepCounter == null)
            {
                return NotFound();
            }

            return sleepCounter;
        }

        // PUT: api/Sleep/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSleepCounter(int id)
        {
            // Find the sleep counter with this id — this will give us a SleepCounter or a null
            var sleepCounter = await _context.SleepCounters.FindAsync(id);

            // If we get a null, return NotFound()
            if (sleepCounter == null)
            {
                return NotFound();
            }

            // Otherwise, set the value of the found sleepCounter TimeEnd to the current time
            _context.Entry(sleepCounter).State = EntityState.Modified;
            sleepCounter.TimeEnd = DateTime.Now;

            // Save that sleepCounter
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SleepCounterExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            // Return either NoContent() or Ok(sleepCounter) — whichever feels best to you.
            return Ok(sleepCounter);
        }


        // PUT: api/Sleep/5/quality
        //
        // This takes two inputs, the first is the "ID" in our route helper below (e.g. "{id}/quality")
        // and the second is the Object/Class that receives the BODY of the request. In this case
        // our SleepCounter. We are, in this case, only sending over the QualityRating of a
        // SleepCounter.
        [HttpPut("{id}/quality")]
        public async Task<IActionResult> PutQualitySleepCounter(int id, SleepCounter sleepCounterFromTheClient)
        {
            // Log what we got from the client
            Console.WriteLine($"Hey, got a {sleepCounterFromTheClient.QualityRating} from the client.");

            // Find the sleep counter with this id — this will give us a SleepCounter or a null
            var sleepCounterFromTheDatabase = await _context.SleepCounters.FindAsync(id);

            // If we get a null, return NotFound()
            if (sleepCounterFromTheDatabase == null)
            {
                return NotFound();
            }

            // Otherwise, set the value of the found sleepCounter QualityRating to the sleep score
            _context.Entry(sleepCounterFromTheDatabase).State = EntityState.Modified;

            // Pull out the qualityRating from the object we received from the client
            // and assign that to the object we got from the database. (e.g. copying
            // the quality rating from the client input to what we are going to update
            // in the database)
            sleepCounterFromTheDatabase.QualityRating = sleepCounterFromTheClient.QualityRating;

            // Save that sleepCounter
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SleepCounterExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            // Return either NoContent() or Ok(sleepCounter) — whichever feels best to you.
            return Ok(sleepCounterFromTheDatabase);
        }

        // POST: api/Sleep
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<SleepCounter>> PreSleepCounter()
        {
            // first request 
            // Makes a new SleepCounter
            SleepCounter sleepCounter = new SleepCounter()
            {
                // Set the TimeStart to now
                TimeStart = DateTime.Now,
                // And make sure the TimeEnd is null
                TimeEnd = null
            };
            // second request make a update field time end
            // third request update quality

            _context.SleepCounters.Add(sleepCounter);
            await _context.SaveChangesAsync();
            return CreatedAtAction("GetSleepCounter", new { id = sleepCounter.Id }, sleepCounter);
        }

        // DELETE: api/Sleep/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<SleepCounter>> DeleteSleepCounter(int id)
        {
            var sleepCounter = await _context.SleepCounters.FindAsync(id);
            if (sleepCounter == null)
            {
                return NotFound();
            }

            _context.SleepCounters.Remove(sleepCounter);
            await _context.SaveChangesAsync();

            return sleepCounter;
        }

        private bool SleepCounterExists(int id)
        {
            return _context.SleepCounters.Any(e => e.Id == id);
        }
    }
}
