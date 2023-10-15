using Homies.Data;
using Homies.Data.Models;
using Homies.Models.Event;
using Homies.Models.Type;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace Homies.Controllers
{
    [Authorize]
    public class EventController : Controller
    {

        private readonly HomiesDbContext _data;

        public EventController(HomiesDbContext data)
        {
            _data = data;
        }

        public async Task<IActionResult> Add()
        {
            EventFormModel eventModel = new EventFormModel()
            {
                Types = GetTypes()
            };

            return View(eventModel);
        }

        [HttpPost]
        public async Task<IActionResult> Add(EventFormModel eventModel)
        {
            if (!GetTypes().Any(e => e.Id == eventModel.TypeId))
            {
                ModelState.AddModelError(nameof(eventModel.TypeId), "Type does not exist!");
            }

            if (!ModelState.IsValid)
            {
                return View(eventModel);
            }

            string currentUserId = GetUserId();

            var eventToAdd = new Event()
            {
                Name = eventModel.Name,
                Description = eventModel.Description,
                CreatedOn = DateTime.Now,
                TypeId = eventModel.TypeId,
                OrganiserId = currentUserId,
                Start = eventModel.Start,
                End = eventModel.End
            };

            await _data.Events.AddAsync(eventToAdd);
            await _data.SaveChangesAsync();

            return RedirectToAction("All", "Event");
        }

        public async Task<IActionResult> All()
        {
            var eventsToDisplay = await _data
                .Events
                .Select(e => new EventViewShortModel()
                {
                    Id = e.Id,
                    Name = e.Name,
                    Start = e.Start.ToString("dd/MM/yyyy H:mm"),
                    Type = e.Type.Name,
                    Organiser = e.Organiser.UserName
                })
                .ToListAsync();

            return View(eventsToDisplay);
        }

        public async Task<IActionResult> Join(int id)
        {
            var eventToAdd = await _data
                .Events
                .FindAsync(id);

            if (eventToAdd == null)
            {
                return BadRequest();
            }

            string currentUserId = GetUserId();

            var entry = new EventParticipant()
            {
                EventId = eventToAdd.Id,
                HelperId = currentUserId,
            };

            if (await _data.EventsParticipants.ContainsAsync(entry))
            {
                return RedirectToAction("Joined", "Event");
            }

            await _data.EventsParticipants.AddAsync(entry);
            await _data.SaveChangesAsync();

            return RedirectToAction("Joined", "Event");
        }

        public async Task<IActionResult> Leave(int id)
        {
            var eventId = id;
            var currentUser = GetUserId();

            var eventToLeave = _data.Events.FindAsync(eventId);

            if (eventToLeave == null)
            {
                return BadRequest();
            }

            var entry = await _data.EventsParticipants.FirstOrDefaultAsync(ep => ep.HelperId == currentUser && ep.EventId == eventId);
            _data.EventsParticipants.Remove(entry);
            await _data.SaveChangesAsync();

            return RedirectToAction("All", "Event");
        }

        public async Task<IActionResult> Joined()
        {
            string currentUserId = GetUserId();

            var userEvents = await _data
                .EventsParticipants
                .Where(ep => ep.HelperId == currentUserId)
                .Select(ep => new EventViewShortModel()
                {
                    Id = ep.Event.Id,
                    Name = ep.Event.Name,
                    Start = ep.Event.Start.ToString("dd/MM/yyyy H:mm"),
                    Type = ep.Event.Type.Name
                })
                .ToListAsync();

            return View(userEvents);
        }

        public async Task<IActionResult> Details(int id)
        {
            var eventToDisplay = await _data
               .Events
               .Where(e => e.Id == id)
               .Select(e => new EventViewDetailsModel()
               {
                   Id = e.Id,
                   Name = e.Name,
                   Start = e.Start.ToString("dd/MM/yyyy H:mm"),
                   End = e.End.ToString("dd/MM/yyyy H:mm"),
                   Organiser = e.Organiser.UserName,
                   Type = e.Type.Name,
                   Description = e.Description,
                   CreatedOn = e.CreatedOn.ToString("dd/MM/yyyy H:mm")
               })
               .FirstOrDefaultAsync();

            if (eventToDisplay == null)
            {
                return BadRequest();
            }

            return View(eventToDisplay);
        }

        public async Task<IActionResult> Edit(int id)
        {
            var eventToEdit = await _data.Events.FindAsync(id);

            if (eventToEdit == null)
            {
                return BadRequest();
            }

            string currentUserId = GetUserId();
            if (currentUserId != eventToEdit.OrganiserId)
            {
                return Unauthorized();
            }

            EventFormModel eventModel = new EventFormModel()
            {
                Name = eventToEdit.Name,
                Description = eventToEdit.Description,
                Start = eventToEdit.Start,
                End = eventToEdit.End,
                TypeId = eventToEdit.TypeId,
                Types = GetTypes()
            };

            return View(eventModel);
        }

        [HttpPost]
        public async Task<IActionResult> Edit(int id, EventFormModel model)
        {
            var eventToEdit = await _data.Events.FindAsync(id);

            if (eventToEdit == null)
            {
                return BadRequest();
            }

            string currentUser = GetUserId();
            if(currentUser != eventToEdit.OrganiserId) 
            {
                return Unauthorized();
            }

            if(!GetTypes().Any(e => e.Id == model.TypeId))
            {
                ModelState.AddModelError(nameof(model.TypeId), "Type does not exist!");
            }

            eventToEdit.Name = model.Name;
            eventToEdit.Description = model.Description;
            eventToEdit.Start = model.Start;
            eventToEdit.End = model.End;
            eventToEdit.TypeId = model.TypeId;

            await _data.SaveChangesAsync();
            return RedirectToAction("All", "Event");
        }

        private IEnumerable<TypeViewModel> GetTypes()
            => _data
                .Types
                .Select(t => new TypeViewModel()
                {
                    Id = t.Id,
                    Name = t.Name
                });

        private string GetUserId()
           => User.FindFirstValue(ClaimTypes.NameIdentifier);
    }
}
