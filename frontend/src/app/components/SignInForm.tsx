'use client'
import { useRouter } from "next/navigation"
import { useState } from "react"

const tailwindLabel = "absolute left-3 top-1/2 -translate-y-1/2 bg-white px-1 text-gray-600 text-sm transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:-translate-y-1/2 peer-focus:top-0 peer-focus:text-sm peer-focus:text-blue-600 peer-focus:-translate-y-1/2"
const tailwindInput = "peer w-full border border-gray-300 rounded-lg px-3 pt-4 pb-2 placeholder-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/90 text-gray-800"
const SignInFrom = () => {
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const router = useRouter()


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const input = { password, email }
        try {
            const response = await fetch(`/api/Auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(input)
            })
            const data = await response.json()
            if (!response.ok) {
                throw new Error("Something go wrong while fetch data")
            }
            router.push("/")

        } catch (error) {
            console.error("Error: ", error)
        }
    }

    return (
        <main className="relative min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('/assets/NoBullyZoneLoginSignup.png')" }}>
            <header className="absolute top-0 left-0 w-full flex justify-end p-6">
                <a href="/signup"
                    className="bg-white text-blue-600 font-semibold py-2 px-4 rounded-full shadow hover:bg-gray-100 transition">
                    Sign up
                </a>
            </header>
            <div className="min-h-screen flex items-center justify-center px-4 bg-black/30">
                <form onSubmit={handleSubmit} className="w-full max-w-sm bg-white/95 backdrop-blur-md p-8 rounded-2xl shadow-2xl border border-blue-100">
                    <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">Log in</h1>

                    <div className="relative mb-6">
                        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required
                            className={tailwindInput} placeholder="email@example.com" />
                        <label htmlFor="email" className={tailwindLabel}>Email</label>
                    </div>

                    <div className="relative mb-6">
                        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required
                            className={tailwindInput} placeholder="password" />
                        <label htmlFor="password" className={tailwindLabel}>Password</label>
                    </div>

                    <div className="mb-6 text-right">
                        <a href="/forgot-password" className="text-sm text-blue-600 hover:underline">
                            Forgot password?
                        </a>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-xl transition duration-200">
                        Log in
                    </button>
                </form>
            </div>
        </main>
    )
}

export default SignInFrom