'use client'

import { X, ChevronLeft, ChevronRight } from "lucide-react"
import { useEffect } from "react"

type MediaItem = {
    id?: string
    url: string
    isVideo?: boolean
}

type ModalViewProps = {
    mediaItems: MediaItem[]
    mediaIndex: number | null
    setMediaIndex: (index: number | null) => void
}

const ModalView = ({ mediaItems, mediaIndex, setMediaIndex }: ModalViewProps) => {
    if(mediaIndex === null) return null
    const currentItem = mediaItems[mediaIndex]
    
    const handleNext = () => {
        if (mediaIndex !== null) {
            const nextIndex = mediaIndex < mediaItems.length - 1 ? mediaIndex + 1 : 0
            setMediaIndex(nextIndex)
        }
    }

    const handlePrev = () => {
        if (mediaIndex !== null) {
            const prevIndex = mediaIndex > 0 ? mediaIndex - 1 : mediaItems.length - 1
            setMediaIndex(prevIndex)
        }
    }

    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "ArrowRight") handleNext()
        if (e.key === "ArrowLeft") handlePrev()
        if (e.key === "Escape") setMediaIndex(null)
    }

    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown)
        return () => window.removeEventListener("keydown", handleKeyDown)
      }, [mediaIndex])

    if (mediaIndex === null || !currentItem) return null

    return (
        <div className="fixed inset-0 bg-black bg-opacity-80 backdrop-blur-sm z-50 flex items-center justify-center">
            <button
                onClick={() => setMediaIndex(null)}
                className="absolute top-6 right-6 text-white hover:text-gray-300">
                <X className="w-8 h-8" />
            </button>

            <button
                onClick={handlePrev}
                className="absolute left-4 text-white hover:text-gray-300">
                <ChevronLeft className="w-10 h-10" />
            </button>

            <div className="max-w-[90vw] max-h-[80vh] rounded-xl overflow-hidden shadow-lg">
                {currentItem.isVideo ? (
                    <video
                        src={currentItem.url}
                        controls
                        className="w-full h-full max-h-[80vh] object-contain"/>
                ) : (
                    <img
                        src={currentItem.url}
                        alt="media"
                        className="w-full h-full max-h-[80vh] object-contain"/>
                )}
            </div>

            <button
                onClick={handleNext}
                className="absolute right-4 text-white hover:text-gray-300">
                <ChevronRight className="w-10 h-10" />
            </button>
        </div>
    )
}

export default ModalView