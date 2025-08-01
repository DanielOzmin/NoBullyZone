'use client'

import { ShoppingCart } from "lucide-react"
import { usePathname } from "next/navigation"
import { useState } from "react"


const RightSideBar = () => {
    const pathname = usePathname()

    const isMarketRoute = /^\/market(\/.*)?$/.test(pathname)

    const [cartItems, setCartItems] = useState<string[]>([])

    return (
        <aside
            className={`transition-all duration-300 ease-in-out h-full overflow-hidden ml-auto 
            ${isMarketRoute ? "w-64 bg-gray-300 border-l shadow-md" : "w-10 bg-gray-300 hover:w-64 group relative"}`}>
            {isMarketRoute ? (
                <div className="p-4 h-full my-22 flex flex-col justify-start">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-semibold text-gray-800">Cart</h2>
                        <div className="relative">
                            <ShoppingCart className="w-6 h-6 text-blue-600" />
                            {cartItems.length > 0 && (
                                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                                    {cartItems.length}
                                </span>
                            )}
                        </div>
                    </div>

                    <div className="flex-1">
                        {cartItems.length === 0 ? (
                            <p className="text-sm text-gray-500">Your cart is currently empty.</p>
                        ) : (
                            <ul className="space-y-2">
                                {cartItems.map((item, index) => (
                                    <li key={index} className="text-sm text-gray-700">
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            ) : (
                <h1 className="flex justify-center items-center my-26">Right side bar</h1>
            )}

        </aside>
    )
}

export default RightSideBar
