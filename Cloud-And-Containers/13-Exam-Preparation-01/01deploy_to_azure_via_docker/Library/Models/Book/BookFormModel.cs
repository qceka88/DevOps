using Library.Models.Book;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Xml.Linq;
using static Library.Data.DataConstants;

namespace Library.Models.Book
{
    public class BookFormModel
    {
        [Required]
        [StringLength(MaxBookTitle, MinimumLength = MinBookTitle,
            ErrorMessage = "Title should be at least {2} characters long.")]
        public string Title { get; set; } = null!;

        [Required]
        [StringLength(MaxAuthorName, MinimumLength = MinAuthorName)]
        public string Author { get; set; } = null!;

        [Required]
        [StringLength(MaxDescription, MinimumLength = MinDescription,
            ErrorMessage = "Description should be at least {2} characters long.")]
        public string Description { get; set; } = null!;

        [Required]
        [Display(Name = "Image URL")]
        public string Url { get; set; } = null!;

        [Column(TypeName = "decimal(12,3)")]
        public int Rating { get; set; }

        [Display(Name = "Category")]
        public int CategoryId { get; set; }

        public IEnumerable<BookCategoryModel> Categories { get; set; }
            = new List<BookCategoryModel>();
    }
}
