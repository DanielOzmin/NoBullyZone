'use client'

import { MessageCircle } from "lucide-react"
import { useState } from "react"

type Props = {
    commentCount: number
    onClick: () => void
}

const CommentButton = ({ commentCount, onClick }: Props) => {
    const [hovered, setHovered] = useState(false)

    return (
        <button
            onClick={onClick}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className={`flex items-center gap-1 text-sm text-gray-500 hover:text-sky-600 transition hover:scale-105`}>
            <MessageCircle className={`w-5 h-5 ${hovered ? "stroke-current" : ""}`} />
            {commentCount}
        </button>
    )
}

export default CommentButton