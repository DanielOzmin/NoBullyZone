'use client'

import { Post } from "@/types/models"
import { useState } from "react"
import ModalView from "../media/modalView"
import Link from "next/link"
import LikeButton from "../likes/likeButton"
import CommentButton from "../comments/commentButton"
import CommentSection from "../comments/commentSection"

type PostCardProps = {
    post: Post
}

const PostCard = ({ post }: PostCardProps) => {
    const [mediaIndex, setMediaIndex] = useState<number | null>(null)
    const [commentSectionOpen, setCommentSectionOpen] = useState<boolean>(false)

    const mediaItems = post.mediaUrls.map((url) => ({
        id: url,
        url,
        isVideo: url.match(/\.(mp4|webm|ogg)$/i) !== null
    }))

    console.log(commentSectionOpen)

    return (
        <div className="border rounded-2xl p-4 shadow-md mb-4 w-full">
            <div className="flex items-center justify-between mb-2 text-sm text-gray-500">
                <Link
                    href={`/friends/${post.userId}`}
                    className="hover:underline cursor-pointer">
                    @{post.userName}
                </Link>
                <span>{new Date(post.createdAt).toLocaleString()}</span>
            </div>
            <p className="mb-4">{post.content}</p>

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
                    liked={true}
                    likeCount={post.likeCount}
                    onToggle={() => console.log("yeeee")}/>
                <CommentButton
                    commentCount={post.commentCount}
                    onClick={() => setCommentSectionOpen(!commentSectionOpen)}/>
            </div>

            {commentSectionOpen && <CommentSection postId={post.id}/>}

            {mediaIndex !== null && (
                <ModalView
                    mediaItems={mediaItems}
                    mediaIndex={mediaIndex}
                    setMediaIndex={setMediaIndex} />
            )}
        </div>
    )
}

export default PostCard