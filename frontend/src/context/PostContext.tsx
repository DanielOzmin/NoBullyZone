'use client'

import { Post } from "@/types/models"
import { createContext, useEffect, useState } from "react"

type PostContextType = {
    posts: Post[]
    getPosts: () => Promise<void>
    setPosts: React.Dispatch<React.SetStateAction<Post[]>>
}

export const PostContext = createContext<PostContextType | undefined>(undefined)

export const PostProvider = ({ children }: { children: React.ReactNode }) => {
    const [posts, setPosts] = useState<Post[]>([])

    const getPosts = async () => {
        try {
            const res = await fetch("/api/Post/getPosts",
                { credentials: "include" })
            if (!res.ok) {
                throw new Error("something go wrong while fetch Posts")
            }
            const data = await res.json()
            setPosts(data)
        } catch (error) {
            console.error("Unexpected error: ", error)
        }
    }

    useEffect(()=>{
        getPosts()
    },[])

    return(
        <PostContext.Provider value={{ posts, getPosts, setPosts }}>
            {children}
        </PostContext.Provider>
    )
}