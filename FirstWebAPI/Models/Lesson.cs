namespace FirstWebAPI.Models
{
    public class Lesson
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public List<Theme> Themes { get; set; }

        public int CourseId { get; set; }
    }
}
