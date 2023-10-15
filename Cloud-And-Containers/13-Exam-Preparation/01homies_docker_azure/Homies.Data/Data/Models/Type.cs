using System.ComponentModel.DataAnnotations;
using static Homies.Data.Data.DataConstants;

namespace Homies.Data.Data.Models
{
    public class Type
    {
        public int Id { get; set; }

        [StringLength(TypeNameMax)]
        public string Name { get; set; } = null!;

        public virtual IEnumerable<Event> Events { get; set; } = new List<Event>();
    }
}
