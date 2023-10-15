using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using static Library.Data.DataConstants;

namespace Library.Data.Entities
{
    public class Book
    {
        public int Id { get; init; }

        [Required]
        [MaxLength(MaxBookTitle)]
        public string Title { get; set; } = null!;

        [Required]
        [MaxLength(MaxAuthorName)]
        public string Author { get; set; } = null!;

        [Required]
        [MaxLength(MaxDescription)]

        public string Description { get; set; } = null!;

        [Required]
        public string ImageUrl { get; set; } = null!;

        [Required]
        [Column(TypeName = "decimal(4,2)")]
        public decimal Rating { get; set; }

        [ForeignKey(nameof(Category))]
        [Required]
        public int CategoryId { get; set; }

        public Category Category { get; set; } = null!;

        public ICollection<IdentityUserBook> UsersBooks { get; set; } = new List<IdentityUserBook>();
    }
}
