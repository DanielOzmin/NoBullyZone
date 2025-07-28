'use client'

import { useState } from "react"

type Props = {
    onSubmit: (content: string) => void
}

const CommentInput = ({ onSubmit }: Props) => {
    const [comment, setComment] = useState("")

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!comment.trim()) return
        onSubmit(comment)
        setComment("")
    }

    return (
        <form onSubmit={handleSubmit} className="mt-4 flex gap-2 items-start">
            <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                onInput={(e) => {
                    const target = e.target as HTMLTextAreaElement
                    target.style.height = "auto"
                    target.style.height = `${target.scrollHeight}px`}}
                placeholder="Write a comment..."
                rows={1}
                className="flex-1 p-2 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-sky-400 overflow-hidden text-sm"/>
            <button
                type="submit"
                className="bg-sky-500 text-white px-3 py-1 rounded-lg hover:bg-sky-600 transition text-sm">
                Send
            </button>
        </form>
    )
}

export default CommentInput