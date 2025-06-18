'use client'
import { useState } from "react"

const tailwindLabel = "absolute left-3 top-1/2 -translate-y-1/2 bg-white px-1 text-gray-600 text-sm transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:-translate-y-1/2 peer-focus:top-0 peer-focus:text-sm peer-focus:text-blue-600 peer-focus:-translate-y-1/2"
const tailwindInput = "peer w-full border border-gray-300 rounded-lg px-3 pt-4 pb-2 placeholder-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/90 text-gray-800"
const tailwindDateLabel = "absolute left-3 top-2 text-gray-500 text-sm bg-white px-1 transition-all peer-focus:top-[-8px] peer-focus:text-sm peer-focus:text-blue-500 peer-valid:top-0 peer-valid:text-sm peer-valid:text-blue-500"


const SignUpForm = () => {
    const [name, setName] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [birthday, setBirthday] = useState<string>("")
    const [message, setMessage] = useState<string>("")


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        const input = { name, password, email, birthday }
        try {
            const response = await fetch(`/api/Auth/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(input)
            })
            const data = await response.json()

            setMessage(data.message)

        } catch (error) {
            console.error("Error: ", error)
        }
    }

    return (
        <main className="relative min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('/assets/NoBullyZoneLoginSignup.png')" }}>
            <header className="absolute top-0 left-0 w-full flex justify-end p-6">
                <a href="/login"
                    className="bg-white text-blue-600 font-semibold py-2 px-4 rounded-full shadow hover:bg-gray-100 transition">
                    Log in
                </a>
            </header>

            <div className="min-h-screen flex items-center justify-center px-4 bg-black/30">
                <form onSubmit={handleSubmit} className="w-full max-w-sm bg-white/95 backdrop-blur-md p-8 rounded-2xl shadow-2xl border border-blue-100">
                    <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">Sign up</h1>

                    <div className="relative mb-6">
                        <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required
                            className={tailwindInput} placeholder="Your name" />
                        <label htmlFor="name" className={tailwindLabel}>Name</label>
                    </div>

                    <div className="relative mb-6">
                        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required
                            className={tailwindInput} placeholder="you@example.com" />
                        <label htmlFor="email" className={tailwindLabel}>Email</label>
                    </div>

                    <div className="relative mb-6">
                        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required
                            className={tailwindInput} placeholder="Password" />
                        <label htmlFor="password" className={tailwindLabel}>Password</label>
                    </div>

                    <div className="relative mb-6">
                        <input type="date" id="age" value={birthday} onChange={(e) => setBirthday(e.target.value)} required
                            className="peer w-full border border-gray-300 rounded-lg px-3 pt-5 pb-2 text-gray-900 bg-white/90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                        <label htmlFor="age" className={tailwindDateLabel}>Date of Birth</label>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-xl transition duration-200">
                        Sign Up
                    </button>

                    {message && <p className="text-green-500 mt-4 text-center">{message}</p>}
                </form>
            </div>
        </main>
    )
}

export default SignUpForm