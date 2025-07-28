'use client'

import { useState } from "react"
import CommentButton from "./commentButton"
import CommentSection from "./commentSection"
import { Comment } from "@/types/models"

type Props = {
    comment: Comment
}

const CommentCard = ({ comment }: Props) => {
    const [commentSectionOpen, setCommentSectionOpen] = useState<boolean>(false)

    return (
        <div className="bg-gray-50 p-3 rounded-lg shadow-sm mt-2">
            <div className="flex justify-between items-start">
                <span className="font-semibold text-sm text-gray-800">@{comment.userName}</span>
                <span className="text-xs text-gray-500">{new Date(comment.createdAt).toLocaleString()}</span>
            </div>

            <p className="text-sm text-gray-700 mt-1">{comment.content}</p>

            <div className="flex justify-end mt-2">
                <CommentButton
                    commentCount={comment.replyCount}
                    onClick={() => setCommentSectionOpen(!commentSectionOpen)} />
            </div>
            {commentSectionOpen && <CommentSection commentId={comment.id}/>}
        </div>
    )
}

export default CommentCard