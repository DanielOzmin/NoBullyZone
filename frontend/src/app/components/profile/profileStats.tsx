'use client'

import { useAuth } from "@/hooks/useAuth"
import { UserPlus, Megaphone, MessageCircle, FileText, MessageSquare } from "lucide-react"



const ProfileStats = () => {
    const { user } = useAuth()

    if (!user) {
        return
    }

    const connections = user.sentRequests.filter(r => r.status === "Accepted").length +
        user.receivedRequests.filter(r => r.status === "Accepted").length
    const ads = user.ads.length
    const comments = user.posts.reduce((acc, post) => acc + post.comments.length, 0)
    const posts = user.posts.length
    const messages = "" // még ki kell találni, hogy csak egy apihívás lesz vagy másképp microserviceből.

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