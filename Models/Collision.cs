
using System.Collections.Generic;

namespace Final_CollisionsMVC_From_HTML.Models
{
    public class Collision
    {
        public string collision_id { get; set; }
        public string crash_date { get; set; }
        public string crash_time { get; set; }
        public string borough { get; set; }
        public string zip_code { get; set; }
        public string on_street_name { get; set; }
        public string number_of_persons_injured { get; set; }
        public string number_of_persons_killed { get; set; }
    }
    public class Collisions
    {
        public List<Collision> data { get; set; }
    }
}

