'use client'

import { Post } from "@/types/models"
import { useEffect, useState } from "react"
import ModalView from "../media/modalView"
import Link from "next/link"
import LikeButton from "../likes/likeButton"
import CommentButton from "../comments/commentButton"
import CommentSection from "../comments/commentSection"
import { CommentCount, DoLikeUnlike, Likes } from "@/app/services/api"
import DeletePost from "./deletePost"
import { useAuth } from "@/hooks/useAuth"
import { Pencil } from "lucide-react"
import PostForm from "@/app/components/posts/PostForm"

type PostCardProps = {
    postData: Post
}

const PostCard = ({ postData }: PostCardProps) => {
    const { user } = useAuth()
    const [mediaIndex, setMediaIndex] = useState<number | null>(null)
    const [commentSectionOpen, setCommentSectionOpen] = useState<boolean>(false)
    const [isLiked, setIsLiked] = useState<boolean>(false)
    const [likeCount, setLikeCount] = useState<number>(0)
    const [commentCount, setCommentCount] = useState<number>(0)
    const [refresh, setRefresh] = useState<number>(0)
    const [isEditing, setIsEditing] = useState<boolean>(false)
    const [post, setPost] = useState<Post>(postData)

    console.log(post)

    const mediaItems = (post.mediaUrls || []).map((url) => ({
        id: url,
        url,
        isVideo: url.match(/\.(mp4|webm|ogg|mov)$/i) !== null
    }))

    const handleLikeClick = async () => {
        console.log(post.id)
        const likeUnlike = await DoLikeUnlike({ postId: post.id })
        if (likeUnlike?.success) {
            setRefresh(prev => prev + 1)
        }
    }

    useEffect(() => {
        const fetchLikes = async () => {
            try {
                const likes = await Likes({ targetId: post.id })
                console.log(likes)
                if (likes) {
                    setLikeCount(likes.count)
                    setIsLiked(likes.userLiked)
                }
            } catch (error) {
                console.error("Failed to load likes", error)
            }
        }
        const fetchComments = async () => {
            try {
                const comments = await CommentCount({ targetId: post.id, isPost: true})
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
    }, [refresh])

    console.log(commentCount)
    return (
        <div className="border rounded-2xl p-4 shadow-md mb-4 w-full">
            <div className="flex items-center justify-between mb-2 text-sm text-gray-500">
                <div className="flex gap-2">
                    <Link
                        href={`/friends/${post.userId}`}
                        className="hover:underline cursor-pointer">
                        @{post.userName}
                    </Link>
                    <Pencil className="w-4 h-4" onClick={() => setIsEditing(!isEditing)} />
                </div>

                <span>{new Date(post.createdAt).toLocaleString()}</span>
            </div>
            {isEditing ? <PostForm
                mode="Update"
                postId={post.id}
                initialContent={post.content}
                initialMediaUrls={post.mediaUrls} 
                setPost={setPost}
                setIsEditing={setIsEditing}/> : (
                <div>
                    <div className="flex justify-between">
                        <p className="mb-4">{post.content}</p>

                        {user?.id === post.userId && <DeletePost postId={post.id} />}
                    </div>

                    {post.mediaUrls && post.mediaUrls.length > 0 && (
                        <div className="flex flex-col gap-4">
                            {mediaItems.map((item, index) => (
                                item.isVideo ? (
                                    <video
                                        key={index}
                                        controls
                                        onClick={() => setMediaIndex(index)}
                                        className="w-full h-auto rounded-xl object-cover cursor-pointer">
                                        <source src={item.url} />
                                        Your browser does not support the video tag.
                                    </video>
                                ) : (
                                    <img
                                        key={index}
                                        src={item.url}
                                        alt={`media-${index}`}
                                        onClick={() => setMediaIndex(index)}
                                        className="w-full h-auto rounded-xl object-cover cursor-pointer" />)))}
                        </div>
                    )}

                    <div className="mt-4 flex gap-4">
                        <LikeButton
                            liked={isLiked}
                            likeCount={likeCount}
                            onToggle={() => handleLikeClick()} />
                        <CommentButton
                            commentCount={commentCount}
                            onClick={()=>setCommentSectionOpen(!commentSectionOpen)} />
                    </div>

                    {commentSectionOpen && <CommentSection postId={post.id} setRefresh={setRefresh} />}

                    {mediaIndex !== null && (
                        <ModalView
                            mediaItems={mediaItems}
                            mediaIndex={mediaIndex}
                            setMediaIndex={setMediaIndex} />
                    )}
                </div>
            )}

        </div>
    )
}

export default PostCard