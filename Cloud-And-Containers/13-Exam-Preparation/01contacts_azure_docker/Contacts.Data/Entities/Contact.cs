using System.ComponentModel.DataAnnotations;

namespace Contacts.Data.Entities
{
    public class Contact
    {
        public int Id { get; set; }

        [Required]
        [StringLength(50)]
        public string FirstName { get; set; } = null!;

        [Required]
        [StringLength(50)]
        public string LastName { get; set; } = null!;

        [Required]
        [EmailAddress]
        [StringLength(30)]
        public string Email { get; set; } = null!;

        [Required]
        [Phone]
        [StringLength(14)]
        public string PhoneNumber { get; set; } = null!;

        public string? Address { get; set; }

        public string? Website { get; set; }

        public ICollection<ApplicationUserContact> ApplicationUsersContacts { get; set; }

    }
}
