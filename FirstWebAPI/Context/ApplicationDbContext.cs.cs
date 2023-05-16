using WebJournal.Models;
using Microsoft.EntityFrameworkCore;

namespace WebJournal.Context 
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {

        }

        public DbSet<Lesson> Lessons { get; set; }

        public DbSet<Theme> Themes { get; set; }
    }
}
