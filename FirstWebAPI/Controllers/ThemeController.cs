using WebJournal.Models.DTO;
using WebJournal.Models;
using Microsoft.AspNetCore.Mvc;
using WebJournal.Context;
using Microsoft.EntityFrameworkCore;

namespace WebJournal.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ThemeController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ThemeController(ApplicationDbContext context)
        {
            _context = context;
        }

        #region HTTP

        #region HTTPGets

        [HttpGet("All", Name = "GetAllThemes")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(List<ThemeDTO>))]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public ActionResult<IEnumerable<ThemeDTO>> GetAllThemes()
        {
            IEnumerable<ThemeDTO> themes = _context.Themes.Select(theme => new ThemeDTO()
            {
                Id = theme.Id,
                Name = theme.Name,
                LessonId= theme.LessonId,
            });
            return Ok(themes);
        }

        [HttpGet("name:string", Name = "GetThemeByName")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(List<ThemeDTO>))]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public ActionResult<IEnumerable<LessonDTO>> GetThemeByName(string name)
        {
            IEnumerable<ThemeDTO> themes = _context.Themes.ToList().FindAll(theme => theme.Name == name).Select(lesson => new ThemeDTO()
            {
                Id = lesson.Id,
                Name = lesson.Name,
                LessonId = lesson.LessonId,
            });
            if (!themes.Any())
            {
                return NotFound($"Темы с именем '{name}' нет");
            }
            return Ok(themes);
        }

        [HttpGet("{id:int}", Name = "GetThemeById")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ThemeDTO))]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public ActionResult<ThemeDTO> GetThemeById(int id)
        {
            if (id <= 0)
            {
                return BadRequest();
            }
            Theme Theme = _context.Themes.ToList().Find(thm => thm.Id == id);
            if (Theme == null)
            {
                return NotFound($"Темы с id = {id} не существует");
            }
            return Ok(new ThemeDTO()
            {
                Id = Theme.Id,
                Name = Theme.Name,
                LessonId = Theme.LessonId,
            });
        }

        #endregion

        #region HTTPDeletes

        [HttpDelete("name:string", Name = "DeleteThemeByName")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(List<ThemeDTO>))]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public ActionResult<IEnumerable<ThemeDTO>> DeleteThemeByName(string name)
        {
            List<Theme> themes = _context.Themes.ToList().FindAll(theme => theme.Name == name);

            themes.ToList().ForEach(theme =>
            {
                _context.Lessons.ToList().Find(lesson => lesson.Id == theme.LessonId).Themes.Remove(theme);
                _context.Themes.Remove(theme);
            });

            if (!themes.Any()) 
            {
                return NotFound($"Занятий с именем '{name}' не существует ");
            }

            IEnumerable<ThemeDTO> newThemes = _context.Themes.ToList().FindAll(theme => theme.Name == name).Select(theme => new ThemeDTO()
            {
                Id = theme.Id,
                Name = theme.Name,
                LessonId = theme.LessonId
            });

            return Ok(newThemes);
        }

        [HttpDelete("{id:int}", Name = "DeleteThemeById")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(List<ThemeDTO>))]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public ActionResult<IEnumerable<ThemeDTO>> DeleteThemeById(int id)
        {
            if (id <= 0)
            {
                return BadRequest("Неверный Id");
            }

            Theme theme = _context.Themes.ToList().Find(les => les.Id == id);
            if (theme == null)
            {
                return NotFound($"Темы с id = {id} не существует");
            }

            _context.Lessons.ToList().Find(lesson => lesson.Themes.Remove(theme)).Themes.Remove(theme);

            _context.Themes.Remove(theme);
            
            IEnumerable<ThemeDTO> themes = _context.Themes.Select(theme => new ThemeDTO()
            {
                Id = theme.Id,
                Name = theme.Name,
                LessonId = theme.LessonId
            });
            return Ok(themes);
        }

        #endregion

        #region HTTPPosts

        [HttpPost]
        [Route("Create", Name = "CreateTheme")]
        [ProducesResponseType(StatusCodes.Status201Created, Type = typeof(LessonDTO))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(LessonDTO))]
        [ProducesResponseType(StatusCodes.Status404NotFound, Type = typeof(LessonDTO))]
        [ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(LessonDTO))]
        public ActionResult<LessonDTO> CreateTheme([FromBody] ThemeDTO model)
        {
            if (model == null)
            {
                return BadRequest();
            }

            Lesson lesson = _context.Lessons.ToList().Find(lesson => lesson.Id == model.LessonId);

            if (lesson == null)
            {
                return NotFound($"Занятия с Id = {model.LessonId} не найдено");
            }

            Theme theme = new()
            {
                Id = model.Id,
                Name = model.Name,
                LessonId = model.LessonId,
            };

            _context.Themes.Add(theme);

            lesson.Themes.Add(theme);
            _context.SaveChanges();
            return Created("", theme);
        }

        #endregion

        #region HTTPPuts

        [HttpPut]
        [Route("Update")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ThemeDTO))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(ThemeDTO))]
        [ProducesResponseType(StatusCodes.Status404NotFound, Type = typeof(ThemeDTO))]
        [ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(ThemeDTO))]
        public ActionResult<ThemeDTO> UpdateTheme([FromBody] ThemeDTO model)
        {
            if (model == null || model.Id <= 0 || model.LessonId <= 0)
            {
                return BadRequest();
            }

            Theme existingTheme = _context.Themes.Find(model.Id);
            if (existingTheme == null)
            {
                return NotFound($"Тема с Id = {model.Id} не найдено");
            }

            Lesson newLesson = _context.Lessons.Find(model.LessonId);
            if (newLesson == null)
            {
                return NotFound($"Занятие с Id = {model.LessonId} не найдено");
            }

            Lesson oldLesson = _context.Lessons.Find(existingTheme.LessonId);
            oldLesson.Themes.Remove(existingTheme);

            existingTheme.Name = model.Name;
            existingTheme.LessonId = model.LessonId;
            newLesson.Themes.Add(existingTheme);

            _context.SaveChanges();

            return Ok();
        }

        #endregion

        #endregion
    }
}
