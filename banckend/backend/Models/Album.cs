namespace banckend.Models;

public class UserImage
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string Url { get; set; } = null!;
    public Guid UserId { get; set; }
    public User User { get; set; } = null!;
}