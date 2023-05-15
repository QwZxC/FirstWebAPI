namespace FirstWebAPI.Models.DTO
{
    public record ThemeDTO
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public int LessonId { get; set; }
    }
}
