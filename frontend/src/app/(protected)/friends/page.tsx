'use client'

import FriendsList from "@/app/components/friends/friendsList"
import SearchFriend from "@/app/components/friends/searchFriend"
import SortButton from "@/app/components/friends/sortButton"
import { PendingFriendshipDto, User, UserFriend } from "@/types/models"
import { useEffect, useState } from "react"

type OrderOption = "" | "Likes" | "Comments" | "Messages" | "Friendship time" | "Requests"
const orderby: OrderOption[] = ["Likes", "Comments", "Messages", "Friendship time", "Requests"]


const FriendsPage = () => {
    const [friends, setFriends] = useState<UserFriend[]>([])
    const [allUser, setAllUser] = useState<UserFriend[]>([])
    const [filteredFriends, setFilteredFriends] = useState<UserFriend[]>(friends)
    const [searchMode, setSearchMode] = useState<"friends" | "all">("friends")
    const [order, setOrder] = useState<OrderOption>("")
    const [receivedRequests, setReceivedRequests] = useState<PendingFriendshipDto[]>([])
    const [sentRequests, setSentRequests] = useState<PendingFriendshipDto[]>([])


    const getAllUser = async () => {
        try {
            const res = await fetch("/api/User/me/getalluser", {
                credentials: "include"
            })
            if (!res.ok) {
                throw new Error("Something go wrong while fetch users")
            }
            const data = await res.json()
            setAllUser(data)
        } catch (error) {
            console.error("Failed to fetch all users:", error)
        }

    }

    const getAllFriends = async () => {
        try {
            const res = await fetch("/api/User/me/getallfriends", {
                credentials: "include"
            })
            if (!res.ok) {
                throw new Error("Something go wrong while fetch friends")
            }
            const data = await res.json()
            console.log(data)
            setFriends(data)
        } catch (error) {
            console.error("Failed to fetch friends:", error)
        }
    }

    const getAllRequest = async () => {
        try {
            const res = await fetch("/api/Friendship/getpendingfriendships/requests",
                { credentials: "include" })
            if (!res.ok) {
                throw new Error("something go wrong while fetch friendships")
            }
            const data = await res.json()
            setReceivedRequests(data)
        } catch (error) {
            console.error("Unexpected error: ", error)
        }
    }

    const getAllFriendshipSent = async () => {
        try {
            const res = await fetch("/api/Friendship/getpendingfriendships/sent",
                { credentials: "include" })
            if (!res.ok) {
                throw new Error("something go wrong while fetch friendships")
            }
            const data = await res.json()
            setSentRequests(data)
        } catch (error) {
            console.error("Unexpected error: ", error)
        }
    }


    useEffect(() => {
        getAllFriends()
    }, [])

    useEffect(() => {
        searchMode == "all" ? getAllUser() : getAllFriends()
    }, [searchMode])

    useEffect(() => {
        if (order == "Requests") {
            getAllRequest()
            getAllFriendshipSent()
        }
    }, [order])

    const handleFriendshipDecision = async (id: string, accepted: boolean) => {
        try {
            const res = await fetch("/api/Friendship/respond",{ 
                method: "PUT",
                credentials: "include",
                headers: {"Content-type": "application/json"},
                body: JSON.stringify({FriendshipId: id, Accepted: accepted}) 
            })

            const data = await res.json()

            if (!res.ok) {
                throw new Error("something go wrong while try to responde", data.message)
            }  
        } catch (error) {
            console.error("Unexpected error: ", error)
        }
    }

    return (
        <main>
            <h1 className="flex justify-center mt-24 text-3xl">Friends</h1>
            <div className="flex justify-center">
                <SearchFriend friends={friends} allUser={allUser} searchMode={searchMode} setSearchMode={setSearchMode} setFilteredFriends={setFilteredFriends} />
            </div>
            <div className="flex justify-center gap-6 my-4">
                {orderby.map((item, index) =>
                    <SortButton key={index} filterBy={item} order={order} setOrder={setOrder} />)}
            </div>

            <FriendsList
                friends={friends}
                friendRequests={{ receivedRequests, sentRequests }}
                isRequestMode={order === "Requests"}
                onChoose={(friendshipId, accepted) => handleFriendshipDecision(friendshipId, accepted)}
                allUser={allUser}
                searchMode={searchMode} />
        </main>

    )
}

export default FriendsPage