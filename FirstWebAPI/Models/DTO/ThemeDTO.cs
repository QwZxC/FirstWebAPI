using System.ComponentModel.DataAnnotations;

namespace WebJournal.Models.DTO
{
    public record ThemeDTO
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Обязательное поле")]
        [StringLength(100)]
        public string Name { get; set; }

        [Required]
        public int LessonId { get; set; }
    }
}
