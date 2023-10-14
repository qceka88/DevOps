using System.ComponentModel.DataAnnotations;
using static Library.Data.DataConstants;

namespace Library.Data.Entities
{
    public class Category
    {
        public int Id { get; init; }

        [Required]
        [MaxLength(MaxDescription)]
        public string Name { get; init; } = null!;

        public IEnumerable<Book> Books { get; set; } = new List<Book>();
    }
}
