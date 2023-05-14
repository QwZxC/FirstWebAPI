using FirstWebAPI.Models;
using Microsoft.AspNetCore.Mvc;

namespace FirstWebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LessonController : ControllerBase
    {
        #region HTTPGets

        [HttpGet("All", Name = "GetAllLessons")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(List<Lesson>))]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public ActionResult<IEnumerable<Lesson>> GetAllLessons()
        {
            return Ok(Plan.Lessons);
        }

        [HttpGet("name:string", Name = "GetLessonsByName")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(List<Lesson>))]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public ActionResult<IEnumerable<Lesson>> GetLessonsByName(string name)
        {
            var collection = Plan.Lessons.FindAll(lesson => lesson.Name == name);
            if (collection.Count == 0) {
                return NotFound($"Занятия с именем '{name}' нет");
            }
            return Ok(collection);
        }

        [HttpGet("{id:int}", Name = "GetLesonById")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Lesson))]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public ActionResult<Lesson> GetLesonById(int id)
        {
            if (id <= 0) {
                return BadRequest("Не верный Id(");
            }
            Lesson lesson = Plan.Lessons.Find(les => les.Id == id);
            if (lesson == null) {
                return NotFound($"Занятия с id = {id} нет");
            }
            return Ok(Plan.Lessons.Find(les => les.Id == id));
        }

        #endregion

        #region HTTPDeletes

        [HttpDelete("name:string", Name = "DeleteLessonsByName")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(List<Lesson>))]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public ActionResult<IEnumerable<Lesson>> DeleteLessonsByName(string name)
        {
            var collection = Plan.Lessons.FindAll(lesson => lesson.Name == name);
            if (collection.Count == 0) {
                return NotFound($"Занятия с именем '{name}' нет");
            }
            return Ok(Plan.Lessons);
        }

        [HttpDelete("{id:int}", Name = "DeleteLesonById")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(List<Lesson>))]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public ActionResult<IEnumerable<Lesson>> DeleteLesonById(int id)
        {
            if(id <= 0) {
                return BadRequest("Неверный Id");
            }
            var lesson = Plan.Lessons.Find(les => les.Id == id);
            if (lesson == null) {
                return NotFound($"Занятия с id = {id} нет");
            }
            Plan.Lessons.Remove(lesson);
            return Plan.Lessons;
        }

        #endregion
    }
}
