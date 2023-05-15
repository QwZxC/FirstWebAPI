namespace FirstWebAPI.Models.DTO
{
    public record LessonDTO
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public int CourseId { get; set; }

        public List<Theme> Themes { get; set; }
    }
}
