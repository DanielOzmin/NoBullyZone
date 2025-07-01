'use client'

import { User } from "@/types/models"
import { useRouter } from "next/navigation"
import { createContext, useEffect, useState } from "react"


export type AuthContextType = {
    login: () => void,
    logout: () => void,
    isLoggedIn: boolean,
    user: User | null,
    setUser: React.Dispatch<React.SetStateAction<User | null>>
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null)
    const router = useRouter()

    const fetchUser = async () => {
        try {
            const res = await fetch("/api/User/me", { credentials: "include" })
            if (res.ok) {
                const data = await res.json()
                console.log(data)
                setUser(data)
            } else {
                setUser(null)
            }
        } catch {
            setUser(null)
        }
    }

    useEffect(() => {
        fetchUser()
    }, [])

    const login = async () => {
        await fetchUser()
        router.push("/home")
    }

    const logout = async () => {
        await fetch("/api/auth/logout", {
            method: "POST",
            credentials: "include"
        })
        setUser(null)
        router.push("/")
    }

    return (
        <AuthContext.Provider value={{ user, isLoggedIn: !!user, login, logout, setUser }}>
            {children}
        </AuthContext.Provider>
    )
}