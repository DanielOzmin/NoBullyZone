using banckend.Dtos;
using banckend.Models;

namespace banckend.Repositories;

public interface IPostRepozitory
{
    Task<Post> CreatePostAsync(Guid userId,string content);
    Task<IEnumerable<Post>> GetPostsByIdAsync(Guid userId);
    Task DeletePostAsync(Post post);
    Task<Post> UpdatePostAsync(Guid postId, UpdatePostDto input);
    Task<IEnumerable<Post>> GetPostsAsync();
    Task<Post> GetPostWithMediaAsync(Guid postId);

}