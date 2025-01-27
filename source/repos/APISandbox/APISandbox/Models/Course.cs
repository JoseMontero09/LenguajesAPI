namespace APISandbox.Models
{
    public class Course
    {
        public int Id { get; set; }

        public string Name { get; set; } = null!;

        public string? Code { get; set; }

        public string? Description { get; set; }   
    }
}
