'use client'

import { useAuth } from "@/hooks/useAuth"
import { User } from "@/types/models"
import { ProfileEditProps } from "@/types/types"
import Image from "next/image"
import { useState, useEffect } from "react"


const ProfileDetails = ({ setEditing, signedUrl }: ProfileEditProps) => {
    const {user} = useAuth()

    if(!user){
        return
    }

    return (
        <section className="mt-6 bg-white p-6 rounded-xl shadow-md text-center max-w-xl mx-auto">
            <div className="flex justify-center mb-4">
                <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-blue-300 shadow">
                    <Image
                        src={signedUrl || "/default-profile.png"}
                        alt="profilepic"
                        width={112}
                        height={112}
                        className="object-cover w-full h-full" />
                </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-800">{user.name}</h2>
            <p className="mt-2 text-gray-600">{user.selfDescription || "No current self description"}</p>
            <button className="mt-4 px-5 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
                onClick={() => setEditing(true)}>
                Edit
            </button>
        </section>
    )
}

export default ProfileDetails