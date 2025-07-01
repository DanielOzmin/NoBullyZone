'use client'

import { useAuth } from "@/hooks/useAuth"
import { ProfileEditProps } from "@/types/types"
import { PlusCircle } from "lucide-react"
import Image from "next/image"
import { useRef, useState } from "react"

const EditProfileForm = ({ setEditing, signedUrl }: ProfileEditProps) => {
    const {user, setUser} = useAuth()

    if(!user){
        return
    }

    const [name, setName] = useState(user.name)
    const [selfDescription, setSelfDescription] = useState(user.selfDescription)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleAddButtonClick = () => {
        fileInputRef.current?.click()
    }

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if(!file) return

        const formData = new FormData()
        formData.append("file", file)

        try {
            const response = await fetch("/api/User/me/profile-picture", {
                method: "POST",
                credentials: "include",
                body: formData
            })

            const data = await response.json()
            if(!response.ok){
                console.error("Upload failed: ", data.message)
                return
            }

        } catch (error) {
            console.error("Unexpected error:", error)
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        
        try {
            const res = await fetch("/api/User/me/update",{
                method: "PUT",
                credentials: "include",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({name, selfDescription})
            })
            const data = await res.json()
            
            if(!res.ok){
                console.error("Something go wrong while upload: ", data.message)
                return
            }

            setUser(data)

        } catch (error) {
            console.error("Unexpected error:", error)
        }

        setEditing(false)
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="mt-6 bg-white p-6 rounded-xl shadow-md text-center max-w-xl mx-auto">
            <div className="relative flex justify-center mb-4">
                <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-blue-300 shadow">
                    <Image
                        src={signedUrl || "/default-profile.png"}
                        alt="profilepic"
                        width={112}
                        height={112}
                        className="object-cover w-full h-full"
                    />
                </div>
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                />
                <button
                    type="button"
                    className="absolute bottom-0 right-[calc(50%-56px)] bg-blue-600 text-white rounded-full p-1 hover:bg-blue-700 transition"
                    onClick={handleAddButtonClick}>
                    <PlusCircle className="w-6 h-6" />
                </button>
            </div>

            <div className="mb-4">
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Your name" />
            </div>

            <div className="mb-4">
                <textarea
                    value={selfDescription}
                    onChange={(e) => setSelfDescription(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    placeholder="Tell something about yourself"
                    rows={3} />
            </div>

            <button type="submit"
                className="mt-2 px-5 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition">
                Save
            </button>
        </form>
    )
}

export default EditProfileForm