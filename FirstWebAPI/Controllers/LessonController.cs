using FirstWebAPI.Context;
using FirstWebAPI.Models;
using FirstWebAPI.Models.DTO;
using Microsoft.AspNetCore.Mvc;

namespace FirstWebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LessonController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public LessonController(ApplicationDbContext context)
        {
            _context = context;
        }

        #region HTTPGets

        [HttpGet("All", Name = "GetAllLessons")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(List<LessonDTO>))]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public ActionResult<IEnumerable<LessonDTO>> GetAllLessons()
        {
            IEnumerable<LessonDTO> lessons = Plan.Lessons.Select(lesson => new LessonDTO()
            {
                Id = lesson.Id,
                Name = lesson.Name,
                CourseId = lesson.CourseId,
                Themes = lesson.Themes
            });
            return Ok(lessons);
        }

        [HttpGet("name:string", Name = "GetLessonsByName")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(List<LessonDTO>))]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public ActionResult<IEnumerable<LessonDTO>> GetLessonsByName(string name)
        {
            IEnumerable<LessonDTO> lessons = Plan.Lessons.FindAll(lesson => lesson.Name == name).Select(lesson => new LessonDTO()
            {
                Id = lesson.Id,
                Name = lesson.Name,
                CourseId = lesson.CourseId,
                Themes = lesson.Themes
            });
            if (!lessons.Any())
            {
                return NotFound($"Занятия с именем '{name}' нет");
            }
            return Ok(lessons);
        }

        [HttpGet("{id:int}", Name = "GetLesonById")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(LessonDTO))]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public ActionResult<LessonDTO> GetLesonById(int id)
        {
            if (id <= 0) {
                return BadRequest();
            }
            Lesson lesson = Plan.Lessons.Find(les => les.Id == id);
            if (lesson == null) {
                return NotFound($"Занятия с id = {id} не существует");
            }
            return Ok(new LessonDTO() 
            {
                Id = lesson.Id,
                Name = lesson.Name,
                CourseId= lesson.CourseId,
                Themes = lesson.Themes
            });
        }

        #endregion

        #region HTTPDeletes

        [HttpDelete("name:string", Name = "DeleteLessonsByName")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(List<LessonDTO>))]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public ActionResult<IEnumerable<LessonDTO>> DeleteLessonsByName(string name)
        {
            IEnumerable<Lesson> lessons = Plan.Lessons.FindAll(lesson => lesson.Name == name);

            if (!lessons.Any())
            {
                return NotFound($"Занятий с именем '{name}' не существует ");
            }

            lessons.ToList().ForEach(lesson =>
            {
                lesson.Themes.ForEach(theme => Plan.Themes.Remove(theme));
            });

            lessons.ToList().ForEach(lesson =>Plan.Lessons.Remove(lesson));
            
            return Ok(Plan.Lessons);
        }

        [HttpDelete("{id:int}", Name = "DeleteLesonById")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(List<LessonDTO>))]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public ActionResult<IEnumerable<LessonDTO>> DeleteLesonById(int id)
        {
            if(id <= 0) {
                return BadRequest("Неверный Id");
            }
            Lesson lesson = Plan.Lessons.Find(les => les.Id == id);
            
            if (lesson == null) {
                return NotFound($"Занятия с id = {id} не существует");
            }
            
            lesson.Themes.ForEach(theme => Plan.Themes.Remove(theme));

            Plan.Lessons.Remove(lesson);
            
            IEnumerable<LessonDTO> lessons = Plan.Lessons.Select(lesson => new LessonDTO()
            {
                Id = lesson.Id,
                Name = lesson.Name,
                CourseId = lesson.CourseId,
                Themes = lesson.Themes
            });
            return Ok(lessons);
        }

        #endregion

        #region HTTPPosts

        [HttpPost]
        [Route("Create", Name = "CreateLesson")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(LessonDTO))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(LessonDTO))]
        public ActionResult<LessonDTO> CreateLesson([FromBody]LessonDTO model)
        {
            if (model == null)
                return BadRequest();

            int id = Plan.Lessons.LastOrDefault().Id + 1;
            
            Lesson lesson = new()
            {
                Id = id,
                Name = model.Name,
                CourseId = model.CourseId,
            };

            LinkTheme(lesson, model);

            lesson.Themes = model.Themes;
            Plan.Lessons.Add(lesson);
            model.Id = lesson.Id; 
            return Ok(model);
        }

        #endregion

        private void LinkTheme(Lesson lesson, LessonDTO model)
        {
            model.Themes.ForEach(theme =>
            {
                var oldTheme = Plan.Themes.Find(dbTheme => theme.Id == dbTheme.Id);
                var oldLesson = Plan.Lessons.Find(lesson => lesson.Themes.Exists(th => th.Id == oldTheme.Id));
                oldLesson.Themes.Remove(oldTheme);

                if (oldTheme != null)
                {
                    theme.Id = oldTheme.Id;
                    theme.Name = oldTheme.Name;
                    theme.LessonId = lesson.Id;
                    Plan.Themes.Remove(oldTheme);
                    Plan.Themes.Add(theme);
                }
                else
                {
                    theme.LessonId = lesson.Id;
                    Plan.Themes.Add(theme);
                }
            });
        }
    }
}
