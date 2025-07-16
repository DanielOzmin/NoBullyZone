'use client'

import { PendingFriendshipDto, User, UserFriend } from "@/types/models"
import { MoreVertical } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

type FriendCardProps = {
    friend: UserFriend
    requestId?: string 
    isRequestMode?: boolean
    onChoose?: (friendshipId: string, accepted: boolean) => void
}

const FriendCard = ({ friend, isRequestMode = false, onChoose, requestId }: FriendCardProps) => {
    const [menuOpen, setMenuOpen] = useState(false)

    const toggleMenu = () => setMenuOpen(prev => !prev)

    return (
        <div className="relative flex items-start gap-4 bg-white dark:bg-blue-400 rounded-xl shadow-md p-4 max-w-md hover:shadow-lg transition">
            {isRequestMode && (
                <div className="absolute top-2 right-2">
                    <button onClick={toggleMenu} className="text-gray-600 hover:text-black dark:text-white">
                        <MoreVertical className="w-5 h-5" />
                    </button>

                    {menuOpen && (
                        <div className="absolute right-0 mt-2 bg-white border rounded-md shadow-lg z-10">
                            <button
                                onClick={() => onChoose?.(requestId!, true)}
                                className="block px-4 py-2 text-sm text-green-600 hover:bg-green-200 w-full text-left">
                                ✅ Accept
                            </button>
                            <button
                                onClick={() => onChoose?.(requestId!, false)}
                                className="block px-4 py-2 text-sm text-red-600 hover:bg-red-100 w-full text-left">
                                ❌ Reject
                            </button>
                        </div>
                    )}
                </div>
            )}

            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-blue-400 shadow">
                <Image
                    src={friend.profilePictureUrl || "/default-profile.png"}
                    alt={`${friend.name}'s profile picture`}
                    width={64}
                    height={64}
                    className="object-cover w-full h-full"
                />
            </div>

            <div>
                <Link href={`/friends/${friend.id}`}>
                    <h2 className="text-lg font-semibold text-gray-800 dark:text-white hover:underline hover:text-yellow-400">
                        {friend.name}
                    </h2>
                </Link>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{friend.selfDescription}</p>
            </div>
        </div>
    )
}

export default FriendCard