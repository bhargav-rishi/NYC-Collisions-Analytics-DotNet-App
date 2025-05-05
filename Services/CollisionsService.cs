
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;
using System.Text.Json;

using Final_CollisionsMVC_From_HTML.Models;

namespace Final_CollisionsMVC_From_HTML.Services
{
    public class CollisionsService
    {
        // In-memory list to store collision records
        private readonly List<Collision> CollisionsList = new List<Collision>();

        // Flag to track if API data has been fetched
        private bool isDataFetched = false;

        // Check if data is already fetched
        public bool IsDataFetched() => isDataFetched;

        public void MarkDataAsFetched() => isDataFetched = true;

        public bool IsCollisionsListEmpty() => CollisionsList.Count == 0;

        // Add multiple collision records
        public void AddCollisions(List<Collision> collisions)
        {
            CollisionsList.AddRange(collisions);
        }

        // Create: Add a single collision record
        public void AddCollision(Collision collision)
        {
            CollisionsList.Insert(0, collision);
        }

        // Read: Get all collisions
        public List<Collision> GetAllCollisions()
        {
            return CollisionsList;
        }

        // Read: Get a collision by unique collision ID
        public Collision GetCollisionById(string collisionId)
        {
            return CollisionsList.FirstOrDefault(c => c.collision_id == collisionId);
        }

        // Update: Update an existing collision record
        public bool UpdateCollision(string id, Collision updated)
        {
            var existing = CollisionsList.FirstOrDefault(c =>
                !string.IsNullOrWhiteSpace(c.collision_id) &&
                c.collision_id.Trim().Equals(id?.Trim(), StringComparison.OrdinalIgnoreCase));

            if (existing != null)
            {
                // Apply each field from the updated model
                existing.crash_date = updated.crash_date;
                existing.crash_time = updated.crash_time;
                existing.borough = updated.borough;
                existing.on_street_name = updated.on_street_name;
                existing.number_of_persons_injured = updated.number_of_persons_injured;
                existing.number_of_persons_killed = updated.number_of_persons_killed;

                Console.WriteLine($"Updated collision with ID: {id}");
                return true;
            }

            Console.WriteLine($"Update failed: No record with ID {id} found.");
            return false;
        }


        // Delete: Remove a collision by ID
        public bool DeleteCollision(string collisionId)
        {
            var collision = CollisionsList.FirstOrDefault(c => c.collision_id == collisionId);
            if (collision != null)
            {
                CollisionsList.Remove(collision);
                return true;
            }
            return false;
        }
    }
}
