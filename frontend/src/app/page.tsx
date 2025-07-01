'use client'


export default function LandingPage() {
  return (
    <main className="relative min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('/assets/NoBullyZone.png')" }}>

      <header className="absolute top-0 left-0 w-full flex justify-end p-6">
        <a href="/signup"
          className="bg-white text-blue-600 font-semibold py-2 px-4 rounded-full shadow hover:bg-gray-100 transition">
          Sign up
        </a>
      </header>

      <div className="flex flex-col items-center justify-center text-center h-screen">
        <a href="/login"
          className="bg-blue-700 hover:bg-blue-800 text-white font-medium py-2 px-6 rounded-full text-lg shadow-md transition">
          Log in
        </a>
      </div>

    </main>
  )

}
