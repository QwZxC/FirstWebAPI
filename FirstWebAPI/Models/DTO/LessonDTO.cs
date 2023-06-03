using System.ComponentModel.DataAnnotations;

namespace WebJournal.Models.DTO
{
    public record LessonDTO
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Обязательное поле")]
        [StringLength(100)]
        public string Name { get; set; }

        [Range(1, 100, ErrorMessage = "Значение поля должно в границах от 1 до 100")]
        public int CourseId { get; set; }

        [Required(ErrorMessage = "Обязательное поле")]
        public List<Theme> Themes { get; set; }
    }
}
