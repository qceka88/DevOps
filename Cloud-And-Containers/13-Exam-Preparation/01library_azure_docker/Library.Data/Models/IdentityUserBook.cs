using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations.Schema;

namespace Library.Data.Entities
{
    public class IdentityUserBook
    {
        [ForeignKey(nameof(IdentityUser))]
        public string CollectorId { get; set; } = null!;
        public IdentityUser Collector { get; set; } = null!;


        [ForeignKey(nameof(Book))]
        public int BookId { get; set; }
        public Book Book { get; set; } = null!;
    }
}
