using Library.Data.Entities;
using Microsoft.AspNetCore.Identity;

namespace Library.Models.Book
{
    public class BookDetailsViewModel
    {
        public int Id { get; init; }

        public string ImageUrl { get; init; } = null!;

        public string Title { get; init; } = null!;

        public string Author { get; init; } = null!;

        public string Rating { get; init; } = null!;

        public string Category { get; set; } = null!;

        public string Description { get; set; } = null!;

    }
}
