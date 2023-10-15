namespace Library.Models.Book
{
    public class AllBookQueryModel
    {
        public IEnumerable<BookDetailsViewModel> Books { get; set; }
          = new List<BookDetailsViewModel>();
    }
}
