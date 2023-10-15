using System.ComponentModel.DataAnnotations;
using RequiredAttribute = System.ComponentModel.DataAnnotations.RequiredAttribute;
using static Contacts.Data.DataConstants.Contact;

namespace Contacts.Models
{
    public class ContactFormModel
    {
        [Required]
        [StringLength(ContactFirstNameMaxLength, MinimumLength = ContactFirstNameMinLength)]
        [Display(Name = "First Name")]
        public string FirstName { get; set; } = null!;

        [Required]
        [StringLength(ContactLastNameMaxLength, MinimumLength = ContactLastNameMinLength)]
        [Display(Name = "Last Name")]
        public string LastName { get; set; } = null!;

        [Required]
        [EmailAddress]
        [Display(Name = "E-mail")]
        [StringLength(ContactEmailMaxLength, MinimumLength = ContactEmailMinLength)]
        public string Email { get; set; } = null!;

        [Required]
        [StringLength(ContactPhoneNumberMaxLength, MinimumLength = ContactPhoneNumberMinLength)]
        [Display(Name = "Phone Number")]
        public string PhoneNumber { get; set; } = null!;

        public string? Address { get; set; }

        [RegularExpression(ContactWebsiteRegex)]
        public string? Website { get; set; }
    }
}
