using System.ComponentModel.DataAnnotations;

namespace WebJournal.Models
{
    public class Lesson
    {
        [Key]
        public int Id { get; set; }

        public string Name { get; set; }

        public int CourseId { get; set; }

        public List<Theme> Themes { get; set; } = new List<Theme>();
    }
}
