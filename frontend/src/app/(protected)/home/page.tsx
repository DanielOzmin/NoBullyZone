'use client'

import PostForm from "@/app/components/posts/PostForm"
import PostList from "@/app/components/posts/postList"
import { useAuth } from "@/hooks/useAuth"
import { usePostContext } from "@/hooks/usePostHook"
import { Post } from "@/types/models"
import { useEffect, useState } from "react"



const Home = () => {
    const { user } = useAuth()
    const {posts, getPosts} = usePostContext()


    if(!user) return

    useEffect(()=>{
        getPosts()
    },[])

    return (
        <main className="mx-auto mt-28 text-3xl">
        <PostForm mode="Create"/>
        <PostList postList={posts}/>
        </main>
    )
}

export default Home