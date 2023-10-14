using Library.Data;
using Library.Data.Entities;
using Library.Models.Book;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace Library.Controllers
{
    [Authorize]
    public class BookController : Controller
    {
        private readonly LibraryDbContext _data;
        public BookController(LibraryDbContext data)
            => _data = data;

        public IActionResult Add()
        {
            BookFormModel bookModel = new BookFormModel()
            {
                Categories = GetCategories()
            };

            return View(bookModel);
        }

        [HttpPost]

        public async Task<IActionResult> Add(BookFormModel bookModel)
        {
            if (!GetCategories().Any(b => b.Id == bookModel.CategoryId))
            {
                ModelState.AddModelError(nameof(bookModel.CategoryId), "Category does not exist.");
            }

            if (!ModelState.IsValid)
            {
                bookModel.Categories = GetCategories();

                return View(bookModel);
            }

            var book = new Book()
            {
                Title = bookModel.Title,
                Author = bookModel.Author,
                Description = bookModel.Description,
                ImageUrl = bookModel.Url,
                Rating = bookModel.Rating,
                CategoryId = bookModel.CategoryId,
            };

            await _data.Books.AddAsync(book);
            await _data.SaveChangesAsync();

            var boards = _data.Categories;

            return RedirectToAction("All", "Book");
        }

        public IActionResult All()
        {
            var allBooks = new AllBookQueryModel()
            {
                Books = _data.Books
                    .Select(b => new BookDetailsViewModel()
                    {
                        Id = b.Id,
                        ImageUrl = b.ImageUrl,
                        Title = b.Title,
                        Author = b.Author,
                        Rating = b.Rating.ToString(),
                        Category = b.Category.Name,
                        Description = b.Description
                    })
            };

            return View(allBooks);
        }

        [HttpPost]
        public async Task<IActionResult> AddToCollection(int id)
        {
            var book = await _data.Books.FindAsync(id);

            if (book == null)
            {
                return BadRequest();
            }

            string currentUserId = GetUserId();

            var entry = new IdentityUserBook()
            {
                BookId = book.Id,
                CollectorId = currentUserId
            };

            if (_data.UsersBooks.Contains(entry))
            {
                return RedirectToAction("All", "Book");
            }

            await _data.UsersBooks.AddAsync(entry);
            await _data.SaveChangesAsync();

            return RedirectToAction("All", "Book");
        }


        [HttpPost]
        public async Task<IActionResult> RemoveFromCollection(int id)
        {
            var bookId = id;
            var currentUser = GetUserId();
            var book = await _data.Books.FindAsync(id);

            if (book == null)
            {
                return BadRequest();
            }

            var entry = await _data.UsersBooks.FirstOrDefaultAsync(um => um.CollectorId == currentUser && um.BookId == id);
            _data.UsersBooks.Remove(entry);
            await _data.SaveChangesAsync();

            return RedirectToAction("All", "Book");
        }


        public async Task<IActionResult> Mine()
        {
            string currentUserId = GetUserId();
            var currentUser = await _data.Users.FindAsync(currentUserId);

            var allBooks = new AllBookQueryModel()
            {
                Books = _data.UsersBooks
                    .Where(um => um.CollectorId == currentUserId)
                    .Select(um => new BookDetailsViewModel()
                    {
                        Id = um.Book.Id,
                        Title = um.Book.Title,
                        ImageUrl = um.Book.ImageUrl,
                        Rating = um.Book.Rating.ToString(),
                        Author = um.Book.Author,
                        Category = um.Book.Category.Name,
                        Description = um.Book.Description
                    })
            };

            return View(allBooks);
        }

        private string GetUserId()
           => this.User.FindFirstValue(ClaimTypes.NameIdentifier);

        private IEnumerable<BookCategoryModel> GetCategories()
         => _data
             .Categories
             .Select(b => new BookCategoryModel()
             {
                 Id = b.Id,
                 Name = b.Name
             });
    }
}