using System.Reflection.Metadata;

namespace Library.Data
{
    public class DataConstants
    {
        //Category
        public const int MaxCategoryName = 50;
        public const int MinCategoryName = 5;

        // Book
        public const int MaxBookTitle = 50;
        public const int MinBookTitle = 10;
        public const int MaxDescription = 5000;
        public const int MinDescription = 5;
        public const int MaxAuthorName = 50;
        public const int MinAuthorName = 5;

        // User
        public const int MaxUserUsername = 20;
        public const int MaxUserEmail = 60;
    }
}
