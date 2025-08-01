'use client'

import ModalView from "@/app/components/media/modalView"
import { Ad, MediaItem } from "@/types/models"
import { MapPin, Tags } from "lucide-react"
import { useEffect, useState } from "react"

type ProductOrServicePageProps = {
    params: { id: string }
}
const AdPage = ({ params }: ProductOrServicePageProps) => {
    const id = params.id
    const [ad, setAd] = useState<Ad | null>(null)
    const [mediaIndex, setMediaIndex] = useState<number | null>(null)

    useEffect(() => {
        const fetchAd = async () => {
            try {
                const res = await fetch(`/api/Ad/getadbyid/${id}`, { credentials: 'include' })
                if (!res.ok) {
                    throw new Error("something go wrong while fetch ad")
                }
                const data = await res.json()
                setAd(data)
            } catch (error) {
                console.error("unexpercted error")
            }

        }
        fetchAd()
    }, [id])

    if (ad == null) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        )
    }

    const mediaItems: MediaItem[] = ad.mediaUrls.map(url => ({
        url: url
    }))

    return (
        <main className="max-w-5xl mx-auto px-6 py-22">
             <div className="rounded-xl shadow-md bg-white overflow-hidden">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 p-4">
                    {ad.mediaUrls.map((url, index) => (
                        <img
                            key={index}
                            src={url}
                            alt={`image-${index}`}
                            onClick={() => setMediaIndex(index)}
                            className="w-full h-60 object-cover rounded-lg cursor-pointer hover:opacity-90 transition"/>
                    ))}
                </div>

                <div className="p-6 space-y-4">
                    <div>
                        <label className="text-xs uppercase text-gray-500 font-medium">Title</label>
                        <h1 className="text-2xl font-bold text-gray-800">{ad.title}</h1>
                    </div>

                    <div>
                        <label className="text-xs uppercase text-gray-500 font-medium">Location</label>
                        <div className="flex items-center gap-2 text-gray-600">
                            <MapPin className="w-5 h-5 text-blue-500" />
                            <span>{ad.location}</span>
                        </div>
                    </div>

                    <div>
                        <label className="text-xs uppercase text-gray-500 font-medium">Price</label>
                        <p className="text-lg font-semibold text-blue-600">{ad.price} Ft</p>
                    </div>

                    <div>
                        <label className="text-xs uppercase text-gray-500 font-medium">Description</label>
                        <p className="mt-1 text-gray-700 whitespace-pre-line">{ad.description}</p>
                    </div>

                    <div>
                        <label className="text-xs uppercase text-gray-500 font-medium">Category</label>
                        <div className="mt-2 flex flex-wrap gap-3">
                            <span className="flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                                <Tags className="w-4 h-4" />
                                {ad.adType === 1 ? "Service" : "Product"}
                            </span>

                            {ad.categories.map((cat, i) => (
                                <span
                                    key={i}
                                    className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                                    {cat}
                                </span>
                            ))}
                        </div>
                    </div>
                    <div className="mt-8">
                        <button className="bg-emerald-600 text-white px-6 py-3 rounded-xl hover:bg-emerald-700 transition font-semibold"
                        onClick={()=>console.log("Yeeee")}>
                            Reserve This Ad
                        </button>
                    </div>
                </div>
            </div>
            {mediaIndex !== null && (
                <ModalView
                    mediaItems={mediaItems}
                    mediaIndex={mediaIndex}
                    setMediaIndex={setMediaIndex} />
            )}
        </main>
    )
}

export default AdPage