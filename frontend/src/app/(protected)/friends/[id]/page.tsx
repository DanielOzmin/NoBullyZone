'use client'
import HandleFriend from "@/app/components/friends/handleFriend"
import PostList from "@/app/components/posts/postList"
import ProfileTabSelector from "@/app/components/profile/profiletabselector"
import { Post, User } from "@/types/models"
import { FriendshipType, ProfileView } from "@/types/types"
import Image from "next/image"
import { useEffect, useState } from "react"

type FriendPageProps = {
    params: { id: string }
}

const FriendPage = ({ params }: FriendPageProps) => {
    const [selectedTab, setSelectedTab] = useState<ProfileView>("Profile")
    const [user, setUser] = useState<User>()
    const [friendship, setFriendship] = useState<FriendshipType>({status: "NoFriendship", isRecieved: false})
    const [postList, setPostList] = useState<Post[]>([])

    const id = params.id
    console.log(id)

    const getUserById = async () => {
        try {
            const res = await fetch(`/api/User/me/getuserbyid/${id}`, {
                credentials: "include"
            })
            if (!res.ok) {
                throw new Error("Something go wrong while fetch user")
            }
            const data = await res.json()
            setUser(data)
        } catch (error) {
            console.error("failed to fetch user details: ", error)
        }
    }

    const getFriendShipStatus = async () => {
        try {
            const res = await fetch(`/api/Friendship/getFriendshipStatus/${id}`, {
                credentials: "include"
            })
            if (!res.ok) {
                throw new Error("Something go wrong while fetch friendship status")
            }
            const data = await res.json()
            console.log(data)
            setFriendship({friendshipId: data.friendshipId ,status: data.status,isRecieved: data.isRecieved })
        } catch (error) {
            console.error("unexpected error: ", error)
        }
    }

    const getFirendPosts = async () => {
        try {
            const res = await fetch(`/api/Post/getFriendPosts/${id}`,
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



    useEffect(() => {
        getUserById()
        getFirendPosts()
        
    }, [])

    useEffect(()=>{
        getFriendShipStatus()
    },[])

    if(!user) {
        return (
            <div>No user data available</div>
        )
    }

    console.log(friendship)
    return (
        <main className="pt-10 p-4 text-black text-3xl">

            <ProfileTabSelector selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
            <div className="flex justify-center mt-2">
                <HandleFriend id={id} friendship={friendship} setFriendship={setFriendship}/>
            </div>

            <section className="mt-6 bg-white p-6 rounded-xl shadow-md text-center max-w-xl mx-auto">
                <div className="flex justify-center mb-4">
                    <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-blue-300 shadow">
                        <Image
                            src={user?.profilePictureUrl || "/default-profile.png"}
                            alt="profilepic"
                            width={112}
                            height={112}
                            className="object-cover w-full h-full" />
                    </div>
                </div>
                <h2 className="text-2xl font-bold text-gray-800">{user.name}</h2>
                <p className="mt-2 text-gray-600">{user.selfDescription || "No current self description"}</p>
            </section>
            <section>
                <PostList postList={postList} />
            </section>

        </main>
    )
}

export default FriendPage