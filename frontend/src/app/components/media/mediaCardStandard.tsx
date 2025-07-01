import { Album } from "@/types/models"
import { PlusCircle } from "lucide-react"
import Image from "next/image"
import { useRef } from "react"

type MediaStandardProps={
    album: Album
    type: "Image" | "Video"
}

const MediaCardStandard = ({album, type}: MediaStandardProps) => {

    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleFileChange = async(e: React.ChangeEvent<HTMLInputElement>) => { 
        const file = e.target.files?.[0]
        if(!file) return

        const formData = new FormData()
        formData.append("file", file)
        formData.append("albumId", album.id)

        if(type==="Video"){
            formData.append("isVideo", "true")
        }else if(type==="Image"){
            formData.append("isVideo", "false")
        }
        

        try {
            const response = await fetch("/api/Media/uploadMedia", {
                method: "POST",
                credentials: "include",
                body: formData
            })

            const data = await response.json()
            if(!response.ok){
                console.error("Upload failed: ", data.message)
                return
            }

        } catch (error) {
            console.error("Unexpected error:", error)
        }
    }
    const handleAddButtonClick = () => {fileInputRef.current?.click()}

    return (
        <div className="relative bg-white shadow rounded-xl p-3 w-48 hover:shadow-lg transition cursor-pointer">
            <div className="relative aspect-video rounded-lg overflow-hidden">
                <div className="relative w-40 h-40 rounded-xl overflow-hidden shadow">
                    <Image
                        src="/album.png"
                        alt="Album cover"
                        fill
                        className="object-cover"/>
                </div>
                <button
                    type="button"
                    onClick={handleAddButtonClick}
                    className="absolute bottom-2 right-2 bg-blue-600 text-white p-1.5 rounded-full hover:bg-blue-700 transition-shadow shadow-md">
                    <PlusCircle className="w-5 h-5" />
                </button>
                <input
                    ref={fileInputRef}
                    type="file"
                    accept={type === "Video" ? "video/*" : "image/*"}
                    className="hidden"
                    onChange={handleFileChange}/>
            </div>

            <div className="mt-2 text-center">
                <p className="text-base font-semibold truncate">{album.title}</p>
                <p className="text-sm text-gray-500">{album.mediaItems.length} {type}</p>
            </div>
        </div>
    )
}

export default MediaCardStandard