using System.ComponentModel.DataAnnotations;

namespace WebJournal.Models
{
    public class Theme
    {
        [Key]
        public int Id { get; set; }

        public string Name { get; set; }

        public int LessonId { get; set; }
    }
}
