'use client'

import { useEffect, useState } from "react"
import CommentButton from "./commentButton"
import CommentSection from "./commentSection"
import { Comment } from "@/types/models"
import LikeButton from "../likes/likeButton"
import Link from "next/link"
import { CommentCount, DoLikeUnlike, Likes } from "@/app/services/api"

type Props = {
    comment: Comment
}



const CommentCard = ({ comment }: Props) => {
    const [commentSectionOpen, setCommentSectionOpen] = useState<boolean>(false)
    const [isLiked, setIsLiked] = useState<boolean>(false)
    const [likeCount, setLikeCount] = useState<number>(0)
    const [refresh, setRefresh] = useState<number>(0)
    const [commentCount, setCommentCount] = useState<number>(0)

    const handleLikeClick = async () => {
        console.log(comment.id)
        const likeUnlike = await DoLikeUnlike({postId: comment.id})
        if(likeUnlike?.success){
            setRefresh(prev => prev + 1)
        }
    }

    useEffect(()=>{
        const fetchLikes = async () => {
            try {
                const data = await Likes({ targetId: comment.id })
                console.log(data)
                if (data) {
                    setLikeCount(data.count)
                    setIsLiked(data.userLiked)
                }
            } catch (error) {
                console.error("Failed to load likes", error)
            }
        }
        const fetchComments = async () => {
            try {
                const comments = await CommentCount({ targetId: comment.id, isPost: false })
                console.log(comments)
                if (comments) {
                    setCommentCount(comments)
                }
            } catch (error) {
                console.error("Failed to load comments", error)
            }
        }
    
        fetchLikes()
        fetchComments()
    },[refresh])

    return (
        <div className="bg-gray-50 p-3 rounded-lg shadow-sm mt-2">
            <div className="flex justify-between items-start">
                <Link
                    href={`/friends/${comment.userId}`}
                    className="font-semibold text-sm text-gray-800 hover:underline cursor-pointer">
                    @{comment.userName}
                </Link>
                <span className="text-xs text-gray-500">{new Date(comment.createdAt).toLocaleString()}</span>
            </div>

            <p className="text-sm text-gray-700 mt-1">{comment.content}</p>

            <div className="flex justify-end mt-2 gap-4">
                <LikeButton
                    liked={isLiked}
                    likeCount={likeCount}
                    onToggle={() => handleLikeClick()} />
                <CommentButton
                    commentCount={commentCount}
                    onClick={() => setCommentSectionOpen(!commentSectionOpen)} />

            </div>
            {commentSectionOpen && <CommentSection commentId={comment.id} setRefresh={setRefresh} />}
        </div>
    )
}

export default CommentCard