'use client'

import { Heart } from "lucide-react"
import { useState } from "react"

type Props = {
    liked: boolean
    likeCount: number
    onToggle: () => void
}

const LikeButton = ({ liked, likeCount, onToggle }: Props) => {
    const [hovered, setHovered] = useState(false)

    return (
        <button
            onClick={onToggle}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className={`flex items-center gap-1 text-sm transition 
      ${liked ? "text-red-500" : "text-gray-500"} hover:scale-105`}>
            <Heart className={`w-5 h-5 ${liked || hovered ? "fill-current" : "stroke-current"}`} />
            {likeCount}
        </button>
    )
}

export default LikeButton