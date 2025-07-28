'use client'

import { useEffect, useState } from "react"
import CommentInput from "./commentInput"
import CommentList from "./commentList"
import { Comment } from "@/types/models"

type CommentSectionProps = {
    postId?: string
    commentId?: string
}

const CommentSection = ({postId, commentId}: CommentSectionProps) => {
    const [comments, setComments] = useState<Comment[]>([])

    const sendComment = async (content: string) => {

            try {
                const url = postId ? `/api/Comment/createPostComment` : `/api/Comment/createCommentComment`
                const postData = postId ?  {TargetId: postId, Content: content} : {TargetId: commentId, Content: content}
                const res = await fetch(`${url}`,{
                    method: "POST",
                    headers: {"Content-type": "application/json"},
                    body: JSON.stringify(postData),
                    credentials: "include"})
                if(!res.ok){
                    throw new Error("something go wrong while create comment")
                }
                const data = await res.json()
                console.log(data)
            } catch (error) {
                console.error("unexpected error: ", error)
            }         
    }

    const getComments = async () => {
            try {
                const url = postId ? `/api/Comment/comments/${postId}` : `/api/Comment/getcomments/${commentId}`
                const res = await fetch(`${url}`,{credentials: "include"})
                if(!res.ok){
                    throw new Error("something go wrong while get comments")
                }
                const data = await res.json()
                console.log(data)
                setComments(data)
            } catch (error) {
                console.error("unexpected error: ", error)
            }
        
    }

    useEffect(()=>{
        getComments()
    },[])

    return (
        <section>
            <CommentInput onSubmit={sendComment} />
            <CommentList comments={comments}/>
        </section>

    )
}

export default CommentSection