'use client'

import { useAuth } from "@/hooks/useAuth"
import Image from "next/image"
import { useEffect, useState } from "react"


const LeftSideBar = () => {
    const { user } = useAuth()
    const [signedUrl, setSignedUrl] = useState<string | null>(null)


    useEffect(() => {
        const fetchSignedUrl = async () => {
            if (!user?.profilePictureUrl) return

            const res = await fetch("/api/User/me/profile-picture-url", {
                credentials: "include"
            })

            const data = await res.json()
            setSignedUrl(data.url)
        }

        fetchSignedUrl()
    }, [user?.profilePictureUrl])

    return (
        <aside className="flex flex-col items-center w-64 py-30 px-4">
            {user && (
                <>
                    <div className="w-35 h-35 rounded-full overflow-hidden border-4 border-blue-400 shadow mb-4">
                        <Image
                            src={signedUrl || "/default-profile.png"}
                            alt="profilepic"
                            width={120}
                            height={120}
                            className="object-cover w-full h-full"
                        />
                    </div>
                    <h2 className="text-3xl font-semibold text-gray-800 text-center truncate w-full">{user.name}</h2>
                    <p className="text-xl text-gray-600 text-center mt-2 truncate w-full">{user.selfDescription || "No description yet"}</p>
                </>
            )}
        </aside>
    )
}

export default LeftSideBar