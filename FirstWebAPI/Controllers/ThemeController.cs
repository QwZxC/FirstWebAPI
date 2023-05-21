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
        public async Task<ActionResult<IEnumerable<ThemeDTO>>> GetAllThemes()
        {
            IQueryable<ThemeDTO> themes = _context.Themes.Select(theme => new ThemeDTO()
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
        public async Task<ActionResult<IEnumerable<LessonDTO>>> GetThemeByName(string name)
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
        public async Task<ActionResult<ThemeDTO>> GetThemeById(int id)
        {
            if (id <= 0)
            {
                return BadRequest();
            }
            
            Theme Theme = await _context.Themes.FirstOrDefaultAsync(thm => thm.Id == id);
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
        public async Task<ActionResult<IEnumerable<ThemeDTO>>> DeleteThemeByName(string name)
        {
            name.Trim();
            if (string.IsNullOrWhiteSpace(name))
            {
                return BadRequest();
            }

            if (!_context.Themes.Any(theme => theme.Name == name))
            {
                return NotFound($"Занятий с именем '{name}' не существует ");
            }

            List<Theme> themesForRemove = _context.Themes.ToList().FindAll(theme => theme.Name == name);

            themesForRemove.ForEach(theme => _context.Themes.Remove(theme));

            await _context.SaveChangesAsync();

            IEnumerable<ThemeDTO> newThemes = _context.Themes.Select(theme => new ThemeDTO()
            {
                Id = theme.Id,
                Name = theme.Name,
                LessonId = theme.LessonId
            });

            return Ok($"удалено {themesForRemove.Count} записей");
        }

        [HttpDelete("{id:int}", Name = "DeleteThemeById")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(List<ThemeDTO>))]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<IEnumerable<ThemeDTO>>> DeleteThemeById(int id)
        {
            if (id <= 0)
            {
                return BadRequest("Неверный Id");
            }

            Theme theme = await _context.Themes.FirstOrDefaultAsync(les => les.Id == id);
            if (theme == null)
            {
                return NotFound($"Темы с id = {id} не существует");
            }

            _context.Themes.Remove(theme);

            await _context.SaveChangesAsync();
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
        public async Task<ActionResult<LessonDTO>> CreateTheme([FromBody] ThemeDTO model)
        {
            if (model == null)
            {
                return BadRequest();
            }

            Lesson lesson = await _context.Lessons.FirstOrDefaultAsync(lesson => lesson.Id == model.LessonId);
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
            await _context.SaveChangesAsync();
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
        public async Task<ActionResult<ThemeDTO>> UpdateTheme([FromBody] ThemeDTO model)
        {
            if (model == null || model.Id <= 0 || model.LessonId <= 0)
            {
                return BadRequest();
            }

            Theme existingTheme = await _context.Themes.FirstOrDefaultAsync(theme => theme.Id == model.Id);
            if (existingTheme == null)
            {
                return NotFound($"Тема с Id = {model.Id} не найдено");
            }

            Lesson newLesson = await _context.Lessons.FirstOrDefaultAsync(lesson => lesson.Id == model.LessonId);
            if (newLesson == null)
            {
                return NotFound($"Занятие с Id = {model.LessonId} не найдено");
            }

            Lesson oldLesson = await _context.Lessons.FirstOrDefaultAsync(lesson => lesson.Id == existingTheme.LessonId);
            oldLesson.Themes.Remove(existingTheme);

            existingTheme.Name = model.Name;
            existingTheme.LessonId = model.LessonId;
            newLesson.Themes.Add(existingTheme);

            await _context.SaveChangesAsync();

            return Ok();
        }

        #endregion

        #endregion
    }
}
