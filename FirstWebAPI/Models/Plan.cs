namespace FirstWebAPI.Models
{
    public static class Plan
    {
        public static List<Theme> Themes = new()
        {
            new Theme()
            {
                Id = 1,
                Name = "Postgres",
                LessonId = 1
            },
            new Theme
            {
                Id= 2,
                Name = "JavaSpring",
                LessonId = 1
            },
            new Theme
            {
                Id= 3,
                Name = "Asp.Net",
                LessonId = 2
            },
            new Theme
            {
                Id= 4,
                Name = "Docker",
                LessonId = 3
            }
        };

        public static List<Lesson> Lessons { get; set; } = new List<Lesson>(){
                new Lesson
                {
                    Id = 1,
                    Name = "Lesson 1",
                    CourseId = 1,
                    Themes = new List<Theme>() { Themes[0], Themes[1] }
                },
                new Lesson
                {
                    Id = 2,
                    Name = "Lesson 2",
                    CourseId = 2,
                    Themes = new List<Theme>() { Themes[2] }
                },
                new Lesson
                {
                    Id = 3,
                    Name = "Lesson 3",
                    CourseId = 5,
                    Themes = new List<Theme>(){ Themes[3] }
                }
            };
    }
}
