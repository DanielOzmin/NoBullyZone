'use client'

import { Ad } from '@/types/models'
import { Eye } from 'lucide-react'
import Link from 'next/link'

type AdCardProps = {
    ad: Ad
}

const AdCard = ({ ad }: AdCardProps) => {
    
    console.log(ad.id)
    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden transition hover:shadow-lg flex flex-col">
            <div className="w-full h-48 bg-gray-100 flex items-center justify-center">
                <img
                    src={ad.mediaUrls?.[0] || "/placeholder-image.png"}
                    alt={ad.title}
                    className="max-h-full max-w-full object-contain" />
            </div>
            <div className="p-4 flex flex-col justify-between flex-grow">
                <div>
                    <h3 className="text-lg font-semibold text-gray-800 truncate">{ad.title}</h3>
                    <p className="text-sm text-gray-500">{ad.location}</p>
                    <p className="text-blue-600 font-bold text-lg mt-1">{ad.price} Ft</p>
                    <p className="text-sm text-gray-600 mt-2 line-clamp-2">{ad.description}</p>
                </div>
                <div className="mt-4 flex justify-between items-center">
                    <div>
                        <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
                            {ad.adType === 1 ? "Service" : "Product"}
                        </span>
                        {ad.categories.map((cat, index) =>
                            <span key={index} className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
                                {cat}
                            </span>)}
                    </div>

                    <Link href={`market/${ad.id}`} className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 font-medium transition">
                        <Eye className="w-4 h-4" /> View
                    </Link>

                </div>
            </div>
        </div>
    )
}

export default AdCard