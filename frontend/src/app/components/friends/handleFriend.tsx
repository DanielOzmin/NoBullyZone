'use client'

import { FriendshipType } from "@/types/types"
import { Clock, Trash2, UserCheck, UserPlus, UserX } from "lucide-react"

type AddFriendProps = {
    id: string
    friendship: FriendshipType
    setFriendship: React.Dispatch<React.SetStateAction<FriendshipType>>
}


const HandleFriend = ({ id, friendship, setFriendship }: AddFriendProps) => {

    console.log(friendship)

    const sendRequest = async () => {
        try {
            const res = await fetch("/api/Friendship/addFriend", {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "Application/json" },
                body: JSON.stringify({ addresseeId: id })
            })
            const data = await res.json()
            console.log(data.message)
            setFriendship({ status: "Pending", isRecieved: false })
            if (!res.ok) {
                throw new Error("Something go wrong while send friend request")
            }
        } catch (error) {
            console.error("Server error: ", error)
        }
    }

    const deleteFriend = async () => {
        if (!friendship.friendshipId) {
            alert("Friendship already deleted or unavailable. Please refresh.");
            return
        }

        try {
            const res = await fetch(`/api/Friendship/deleteFriendship/${friendship.friendshipId}`, {
                method: "DELETE",
                credentials: "include",
            })
            const data = await res.json()
            console.log(data.message)
            setFriendship({ status: "NoFriendship", isRecieved: false })
            if (!res.ok) {
                throw new Error("Something go wrong while delete friendship")
            }
        } catch (error) {
            console.error("Server error: ", error)
        }
    }

    const acceptRequest = async () => {
        console.log("accept")
        try {
            const res = await fetch("/api/Friendship/respond", {
                method: "PUT",
                credentials: "include",
                headers: { "Content-Type": "Application/json" },
                body: JSON.stringify({ friendshipId: friendship.friendshipId, Accepted: true })
            })
            const data = await res.json()
            console.log(data.message)
            setFriendship({ status: "Accepted", isRecieved: false })
            if (!res.ok) {
                throw new Error("Something go wrong while send friend request")
            }
        } catch (error) {
            console.error("Server error: ", error)
        }
    }

    const rejectRequest = async () => {
        console.log("reject")
        try {
            const res = await fetch("/api/Friendship/", {
                method: "PUT",
                credentials: "include",
                headers: { "Content-Type": "Application/json" },
                body: JSON.stringify({ friendshipId: friendship.friendshipId, Accepted: false })
            })
            const data = await res.json()
            console.log(data.message)
            setFriendship({ status: "Rejected", isRecieved: false })
            if (!res.ok) {
                throw new Error("Something go wrong while send friend request")
            }
        } catch (error) {
            console.error("Server error: ", error)
        }
    }





    if (friendship.status === "Rejected") {
        return (
            <div className="flex items-center gap-2 text-red-500">
                <UserX className="w-5 h-5" />
                Request rejected
            </div>
        )
    }

    if (friendship.status === "Accepted") {
        return (
            <button onClick={deleteFriend} className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700">
                <Trash2 className="w-5 h-5" />
                Delete Friend
            </button>
        )
    }


    if (friendship.status === "Pending") {
        return friendship.isRecieved ? (
            <div className="flex gap-3">
                <button onClick={acceptRequest} className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700">
                    <UserCheck className="w-5 h-5" />
                    Accept
                </button>
                <button onClick={rejectRequest} className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700">
                    <UserX className="w-5 h-5" />
                    Reject
                </button>
            </div>
        ) : (
            <button onClick={deleteFriend} className="flex items-center gap-2 px-4 py-2 bg-yellow-500 text-white rounded-xl hover:bg-yellow-600">
                <Clock className="w-5 h-5" />
                Cancel Request
            </button>
        )
    }

    return (
        <button onClick={sendRequest} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700">
            Send Friend Request
            <UserPlus className="w-5 h-5" />
        </button>
    )
}

export default HandleFriend