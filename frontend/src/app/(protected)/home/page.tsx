'use client'

import { useAuth } from "@/hooks/useAuth"


const Home = () => {
    const {user} = useAuth()

    return (
        <div className="mx-auto mt-28 text-3xl">
        {user?.name}
        </div>
    )
}

export default Home