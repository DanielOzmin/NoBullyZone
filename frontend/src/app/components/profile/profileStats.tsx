'use client'

import { useAuth } from "@/hooks/useAuth"
import { UserStats } from "@/types/models"
import { UserPlus, Megaphone, MessageCircle, FileText, MessageSquare } from "lucide-react"
import { useEffect, useState } from "react"



const ProfileStats = () => {
    const { user } = useAuth()
    const [userStats, setUserStats] = useState<UserStats>()

    if (!user) {
        return (
            <div>First u have to login</div>
        )
    }


    const getStats = async () => {
        try {
            const res = await fetch("/api/User/me/stats",{
                credentials: "include"
            })
            if(!res.ok){
                throw new Error("Something go wrong while fetch stats")
            }
            const data = await res.json()
            console.log(data)
            setUserStats({totalPosts: data.totalPosts, 
                totalAds: data.totalAds, 
                totalComments: data.totalComments,
                totalFriends: data.totalFriends,
                totalMessages: data.totalMessages,})
        } catch (error) {
            console.error("Some unexpected error")
        }
    }

    useEffect(()=>{
        getStats()
    },[])

    if (!userStats) {
        return (
            <div className="flex justify-center items-center h-40">
                <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
                <p className="text-blue-600 text-sm">Loading...</p>
            </div>
        )
    }

    const connections = userStats?.totalFriends ?? 0
    const ads = userStats?.totalAds ?? 0
    const comments = userStats?.totalComments ?? 0
    const posts = userStats?.totalPosts ?? 0
    const messages = userStats?.totalMessages ?? 0 // még ki kell találni, hogy csak egy apihívás lesz vagy másképp microserviceből.

    const stats = [
        { label: "Connections", value: connections, icon: UserPlus },
        { label: "Ads", value: ads, icon: Megaphone },
        { label: "Comments", value: comments, icon: MessageCircle },
        { label: "Posts", value: posts, icon: FileText },
        { label: "Messages", value: messages, icon: MessageSquare },
    ]

    return (
        <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 bg-white rounded-xl shadow-md px-6 py-6 w-full max-w-4xl mx-auto mt-6">
            {stats.map(({ label, value, icon: Icon }) => (
                <div key={label} className="flex flex-col items-center">
                    <div className="w-12 h-12 mb-2 flex items-center justify-center rounded-full bg-blue-100 text-blue-600">
                        <Icon className="w-6 h-6" />
                    </div>
                    <p className="text-xl font-bold text-blue-700">{value}</p>
                    <p className="text-sm text-gray-600">{label}</p>
                </div>
            ))}
        </section>
    )
}

export default ProfileStats