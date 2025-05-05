
using Final_CollisionsMVC_From_HTML.Models;
using Final_CollisionsMVC_From_HTML.Services;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Net.Http;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Final_CollisionsMVC_From_HTML.Controllers
{
    public class HomeController : Controller
    {
        private readonly CollisionsService _collisionsService;
        private readonly HttpClient _httpClient;

        // API Base URL and API Key
        static string BASE_URL = "https://data.cityofnewyork.us/resource/h9gi-nx95.json";
        static string API_KEY = "6WaMyyaKS8UARGwCQT38VeQV2";

        public HomeController(CollisionsService collisionsService)
        {
            _collisionsService = collisionsService;
            _httpClient = new HttpClient();
        }

        // READ: Index action to display all collisions
        public async Task<IActionResult> LoadCollisions(int page = 1, int pageSize = 20)
        {
            Console.WriteLine($"LoadCollisions action called for Page: {page}");

            // Fetch from API only once
            if (!_collisionsService.IsDataFetched())
            {
                string apiPath = $"{BASE_URL}?$limit=100";  // Grab more at once
                var request = new HttpRequestMessage(HttpMethod.Get, apiPath);
                request.Headers.Add("X-App-Token", API_KEY);

                HttpResponseMessage response = await _httpClient.SendAsync(request);
                Console.WriteLine($"API response status code: {response.StatusCode}");

                if (response.IsSuccessStatusCode)
                {
                    string collisionsData = await response.Content.ReadAsStringAsync();
                    var collisions = JsonConvert.DeserializeObject<List<Collision>>(collisionsData);
                    Console.WriteLine($"Fetched {collisions.Count} collisions from API.");

                    _collisionsService.AddCollisions(collisions);
                    _collisionsService.MarkDataAsFetched();
                }
                else
                {
                    Console.WriteLine("Failed to fetch data from API.");
                }
            }

            // Get all collisions from memory
            var allCollisions = _collisionsService.GetAllCollisions();
            int totalRecords = allCollisions.Count;
            int totalPages = (int)Math.Ceiling((double)totalRecords / pageSize);

            // Paginate from memory
            var paginatedCollisions = allCollisions
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToList();

            ViewBag.Page = page;
            ViewBag.HasNextPage = page < totalPages;
            ViewBag.TotalPages = totalPages;

            return View("Read", paginatedCollisions);
        }

        [HttpGet, HttpPost]
        public IActionResult Index()
        {
            Console.WriteLine("Index page accessed.");
            return View();
        }


        [HttpGet, HttpPost]
        public IActionResult About()
        {
            Console.WriteLine("About page accessed.");
            return View();
        }

        // CREATE: Handle both GET (display form) and POST (create collisions)
        [HttpGet, HttpPost]
        public IActionResult Create(Collision newCollisions)
        {
            Console.WriteLine("Create action called.");

            if (HttpContext.Request.Method == "POST")
            {
                //  Hybrid ID (both manual entries and from trusted sources)
                if (string.IsNullOrWhiteSpace(newCollisions.collision_id))
                {
                    newCollisions.collision_id = Guid.NewGuid().ToString(); // Auto-generate unique ID
                    Console.WriteLine("Generated new collision_id: " + newCollisions.collision_id);
                }
                else
                {
                    Console.WriteLine("Using provided collision_id: " + newCollisions.collision_id);
                }

                _collisionsService.AddCollision(newCollisions);  // Save the collision
                Console.WriteLine($"New collision created: {newCollisions.collision_id}");

                return RedirectToAction("Read");  // Redirect to data view
            }

            return View();
        }



        [HttpGet, HttpPost]
        public async Task<IActionResult> Read(int page = 1)
        {
            return await LoadCollisions(page);
        }

        [HttpGet, HttpPost]
        public async Task<IActionResult> Visualization()
        {
            await LoadCollisions();
            var collisions = _collisionsService.GetAllCollisions();
            return View(collisions);
        }

        // UPDATE: Handle both GET (show edit form) and POST (edit collisions)
        [HttpGet]
        public IActionResult Update(string id)
        {
            Console.WriteLine($"GET Edit for Collision ID: {id}");
            var collision = _collisionsService.GetCollisionById(id);
            if (collision == null)
            {
                return NotFound();
            }
            return View(collision);
        }

        // POST: Save the update
        [HttpPost]
        public IActionResult Update(Collision updatedCollision)
        {
            Console.WriteLine($"Received ID = {updatedCollision.collision_id}");

            bool success = _collisionsService.UpdateCollision(updatedCollision.collision_id, updatedCollision);
            if (success)
            {
                Console.WriteLine("Update successful.");
                return RedirectToAction("Read");
            }

            Console.WriteLine("Update failed.");
            return View(updatedCollision);
        }


        // DELETE: Handle both GET (display confirmation) and POST (delete collisions)
        [HttpGet, HttpPost]
        public IActionResult Delete(string id)
        {
            Console.WriteLine($"Delete action called for Collisions ID: {id}");

            if (HttpContext.Request.Method == "POST")
            {
                bool success = _collisionsService.DeleteCollision(id);
                if (success)
                {
                    Console.WriteLine($"Collisions deleted successfully: ID = {id}");
                    return RedirectToAction("Read");
                }
                else
                {
                    Console.WriteLine("Collisions deletion failed. Collisions not found.");
                    return NotFound();
                }
            }

            var collisions = _collisionsService.GetCollisionById(id);
            if (collisions == null)
            {
                Console.WriteLine("Collisions not found for deletion. Returning NotFound.");
                return NotFound();
            }

            return View(collisions);
        }

        // Privacy action for Privacy page
        public IActionResult Privacy()
        {
            Console.WriteLine("Privacy page accessed.");
            return View();
        }
    }
}
