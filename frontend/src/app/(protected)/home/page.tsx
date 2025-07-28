'use client'

import CreatePost from "@/app/components/posts/createPost"
import PostList from "@/app/components/posts/postList"
import { useAuth } from "@/hooks/useAuth"
import { Post } from "@/types/models"
import { useEffect, useState } from "react"



const Home = () => {
    const { user } = useAuth()
    const [postList, setPostList] = useState<Post[]>([])

    const getPosts = async () => {
        try {
            const res = await fetch("/api/Post/getPosts",
                { credentials: "include" })
            if (!res.ok) {
                throw new Error("something go wrong while fetch Posts")
            }
            const data = await res.json()
            console.log(data)
            setPostList(data)
        } catch (error) {
            console.error("Unexpected error: ", error)
        }
    }

    useEffect(()=>{
        getPosts()
    },[])

    if(!user) return

    console.log(postList)

    return (
        <main className="mx-auto mt-28 text-3xl">
        <CreatePost/>
        <PostList postList={postList}/>
        </main>
    )
}

export default Home