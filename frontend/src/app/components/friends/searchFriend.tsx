'use client'

import { UserFriend } from "@/types/models"
import { useEffect, useState } from "react"

type SearchFriendsProps = {
    friends: UserFriend[]
    setFilteredFriends: React.Dispatch<React.SetStateAction<UserFriend[]>>
    allUser: UserFriend[]
    searchMode: "friends" | "all"
    setSearchMode: React.Dispatch<React.SetStateAction<"friends" | "all">>
}

const SearchFriend = ({ friends, allUser, searchMode, setSearchMode, setFilteredFriends }: SearchFriendsProps) => {

    const [name, setName] = useState<string>("")

    useEffect(() => {
        handleFilter()
    }, [name])

    const handleFilter = () => {
        const baseList = searchMode === "friends" ? friends : allUser
        const filtered = baseList.filter(f => f.name.includes(name))
        setFilteredFriends(filtered)
    }

    const handleSearchMode = () => {
        searchMode == "all" ? setSearchMode("friends") : setSearchMode("all")
    }

    return (
        <div className="mt-6 flex justify-center gap-4">
            <input
                type="text"
                placeholder="Search friends..."
                onChange={(e) => setName(e.target.value)}
                className="w-full max-w-md px-4 py-2 rounded-xl shadow border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"/>

            <button
                onClick={handleSearchMode}
                className="px-4 py-2 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 transition whitespace-nowrap">
                {searchMode === "all" ? "Search Friends" : "Search All"}
            </button>
        </div>
    )
}

export default SearchFriend