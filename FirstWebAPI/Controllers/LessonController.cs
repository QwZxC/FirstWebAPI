﻿using WebJournal.Context;
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
        public async Task<ActionResult<IEnumerable<LessonDTO>>> GetAllLessons()
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
        public async Task<ActionResult<LessonDTO>> GetLesonById(int id)
        {
            if (id <= 0) 
            {
                return BadRequest();
            }
            
            Lesson lesson = await _context.Lessons.FirstOrDefaultAsync(les => les.Id == id);
            
            if (lesson == null) 
            {
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
        public async Task<ActionResult<ActionResult<IEnumerable<LessonDTO>>>> DeleteLessonsByName(string name)
        {
            IEnumerable<Lesson> lessons = _context.Lessons.ToList().FindAll(lesson => lesson.Name == name);

            if (!lessons.Any())
            {
                return NotFound($"Занятий с именем '{name}' не существует ");
            }

            lessons.ToList().ForEach(lesson => lesson.Themes.ForEach(theme => _context.Themes.Remove(theme)));

            lessons.ToList().ForEach(lesson => _context.Lessons.Remove(lesson));
            
            await _context.SaveChangesAsync();

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
        public async Task<ActionResult<IEnumerable<LessonDTO>>> DeleteLesonById(int id)
        {
            if(id <= 0) 
            {
                return BadRequest("Неверный Id");
            }
            Lesson lesson = await _context.Lessons.FirstOrDefaultAsync(les => les.Id == id);
            
            if (lesson == null) 
            {
                return NotFound($"Занятия с id = {id} не существует");
            }
            
            lesson.Themes.ForEach(theme => _context.Themes.Remove(theme));

            _context.Lessons.Remove(lesson);

            await _context.SaveChangesAsync();

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
        public async Task<ActionResult<LessonDTO>> CreateLesson([FromBody]LessonDTO model)
        {
            if (model == null)
            {
                return BadRequest();
            }
            
            Lesson lesson = new()
            {
                Name = model.Name,
                CourseId = model.CourseId,
            };

            UnLinkTheme(model);

            lesson.Themes = model.Themes;
            _context.Lessons.Add(lesson);
            await _context.SaveChangesAsync();
            model.Id = lesson.Id; 
            return Created("",model);
        }

        #endregion

        #region HTTPPuts

        [HttpPut]
        [Route("Update")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(LessonDTO))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(LessonDTO))]
        [ProducesResponseType(StatusCodes.Status404NotFound, Type = typeof(LessonDTO))]
        [ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(LessonDTO))]
        public async Task<ActionResult<LessonDTO>> UpdateLesson([FromBody] LessonDTO model)
        {
            if (model == null || model.Id <= 0 || model.Themes.Exists(theme => theme.LessonId != model.Id)) 
            {
                return BadRequest();
            }

            Lesson existingLesson = await _context.Lessons.FirstOrDefaultAsync(lesson => lesson.Id == model.Id);

            if (existingLesson == null) 
            {
                return NotFound($"Занятие с Id = {model.Id} не найдено");
            }

            existingLesson.Name = model.Name;
            existingLesson.CourseId = model.CourseId;
            existingLesson.Themes = model.Themes;

            await _context.SaveChangesAsync();

            return Ok();
        }

        #endregion

        #endregion

        private void UnLinkTheme(LessonDTO model)
        {
            List<Theme> oldThemes = _context.Themes.ToList().FindAll(dbTheme =>
            {
                if (model.Themes.Any(theme => theme.Id == dbTheme.Id))
                    return true;
                return false;
            });

            oldThemes.ForEach(theme => 
            {
                var oldLesson = _context.Lessons.Find(theme.LessonId);
                oldLesson.Themes.Remove(theme);
                _context.Themes.Remove(theme);
            });

            _context.SaveChanges();
        }
    }
}
