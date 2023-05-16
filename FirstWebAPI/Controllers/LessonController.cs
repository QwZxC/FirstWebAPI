using WebJournal.Context;
using WebJournal.Models;
using WebJournal.Models.DTO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace WebJournal.Controllers
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
        
        #region HTTP

        #region HTTPGets

        [HttpGet("All", Name = "GetAllLessons")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(List<LessonDTO>))]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public ActionResult<IEnumerable<LessonDTO>> GetAllLessons()
        {
            IEnumerable<LessonDTO> lessons = _context.Lessons.Select(lesson => new LessonDTO()
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
            IEnumerable<LessonDTO> lessons = _context.Lessons.ToList().FindAll(lesson => lesson.Name == name).Select(lesson => new LessonDTO()
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

            lessons.ToList().ForEach(lesson => 
            _context.Themes.ToList().ForEach(theme =>
            {
            }));
            
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
            
            Lesson lesson = _context.Lessons.ToList().Find(les => les.Id == id);
            if (lesson == null) {
                return NotFound($"Занятия с id = {id} не существует");
            }

            _context.Themes.ToList().ForEach(theme =>
            {
            });

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
            IEnumerable<Lesson> lessons = _context.Lessons.ToList().FindAll(lesson => lesson.Name == name);

            if (!lessons.Any())
            {
                return NotFound($"Занятий с именем '{name}' не существует ");
            }

            lessons.ToList().ForEach(lesson => lesson.Themes.ForEach(theme => _context.Themes.Remove(theme)));

            lessons.ToList().ForEach(lesson => _context.Lessons.Remove(lesson));
            
            _context.SaveChanges();

            IEnumerable<LessonDTO> dbLessons = _context.Lessons.Select(lesson => new LessonDTO()
            {
                Id = lesson.Id,
                Name = lesson.Name,
                CourseId = lesson.CourseId,
                Themes = lesson.Themes
            });

            return Ok(dbLessons);
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
            Lesson lesson = _context.Lessons.ToList().Find(les => les.Id == id);
            
            if (lesson == null) {
                return NotFound($"Занятия с id = {id} не существует");
            }
            
            lesson.Themes.ForEach(theme => _context.Themes.Remove(theme));

            _context.Lessons.Remove(lesson);
            
            IEnumerable<LessonDTO> lessons = _context.Lessons.Select(lesson => new LessonDTO()
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
        [ProducesResponseType(StatusCodes.Status201Created, Type = typeof(LessonDTO))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(LessonDTO))]
        public ActionResult<LessonDTO> CreateLesson([FromBody]LessonDTO model)
        {
            if (model == null)
                return BadRequest();
            
            Lesson lesson = new()
            {
                Name = model.Name,
                CourseId = model.CourseId,
            };

            LinkTheme(lesson, model);

            lesson.Themes = model.Themes;
            _context.Lessons.Add(lesson);
            _context.SaveChanges();
            model.Id = lesson.Id; 
            return Created("",model);
        }

        #endregion

        #region HTTPPut

        [HttpPut]
        [Route("Update")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(LessonDTO))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(LessonDTO))]
        [ProducesResponseType(StatusCodes.Status404NotFound, Type = typeof(LessonDTO))]
        [ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(LessonDTO))]
        public ActionResult<LessonDTO> UpdateLesson([FromBody] LessonDTO model)
        {
            if (model == null || model.Id <= 0 || model.Themes.Exists(theme => theme.LessonId != model.Id)) {
                return BadRequest();
            }

            Lesson existingLesson = _context.Lessons.ToList().Find(lesson => lesson.Id == model.Id);

            if (existingLesson == null) {
                return NotFound($"Занятие с Id = {model.Id} не найдено");
            }

            existingLesson.Name = model.Name;
            existingLesson.CourseId = model.CourseId;
            existingLesson.Themes = model.Themes;

            _context.SaveChanges();

            return Ok();
        }

        #endregion

        #endregion

        private void LinkTheme(Lesson lesson, LessonDTO model)
        {
            model.Themes.ForEach(theme =>
            {
                var oldTheme = _context.Themes.ToList().Find(dbTheme => theme.Id == dbTheme.Id);
                var oldLesson = _context.Lessons.ToList().Find(lesson => lesson.Themes.Exists(th => th.Id == oldTheme.Id));
                if(oldLesson != null)
                    oldLesson.Themes.Remove(oldTheme);

                if (oldTheme != null)
                {
                    theme.Id = oldTheme.Id;
                    theme.Name = oldTheme.Name;
                    theme.LessonId = lesson.Id;
                    _context.Themes.Remove(oldTheme);
                    _context.Themes.Add(theme);
                }
                else
                {
                    theme.LessonId = lesson.Id;
                    _context.Themes.Add(theme);
                }
            });
        }
    }
}
