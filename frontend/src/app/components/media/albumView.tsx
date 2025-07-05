import { Album } from "@/types/models"
import Image from "next/image"

type AlbumViewProps = {
    album: Album
    setMediaIndex: React.Dispatch<React.SetStateAction<number | null>>
}

const AlbumView = ({ album, setMediaIndex }: AlbumViewProps) => {

    const getIndex = (id: string) => {
        const index = album.mediaItems.findIndex(i => i.id === id)
        setMediaIndex(index)
    }

    return (
        <div>
            <h1 className="flex justify-center text-2xl font-semibold mb-4">{album.title}</h1>
            <div className="grid grid-cols-3 gap-2">
                {album.mediaItems.map((media) => (
                    <div key={media.id} onClick={()=>getIndex(media.id)} className="group relative overflow-hidden rounded-lg aspect-square bg-black hover:cursor-pointer">
                        <Image
                            src={media.url}
                            alt="media item"
                            fill
                            className="object-contain" />
                    </div>
                ))}
            </div>
        </div>

    )
}

export default AlbumView