import { Comment } from "@/types/models"
import CommentCard from "./commentCard"

type CommentListProps = {
    comments: Comment[]
}

const CommentList = ({ comments }: CommentListProps) => {
    return (
        <div>
            {comments.map((comment) => <CommentCard key={comment.id} comment={comment} />)}
        </div>
    )
}

export default CommentList