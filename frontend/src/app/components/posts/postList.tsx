import { Post } from "@/types/models"
import PostCard from "./postCard"

type PostListProps = {
    postList: Post[]
}

const PostList = ({postList}: PostListProps) => {
    return (
        <div className="max-w-xl mx-auto mt-4">
            {postList.map((post) => (
                <PostCard key={post.id} postData={post} />
            ))}
        </div>
    )
}

export default PostList