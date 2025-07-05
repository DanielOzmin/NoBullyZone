import { Album } from "@/types/models"
import Image from "next/image"

type AlbumTabSelectorProps = {
    albums: Album[]
    currentAlbum: Album
    setCurrentAlbum: React.Dispatch<React.SetStateAction<Album | undefined>>
}

const AlbumTabSelector = ({ albums, currentAlbum, setCurrentAlbum }: AlbumTabSelectorProps) => {
    return (
        <div className="flex flex-wrap gap-4 p-4">
            {albums.map((album) => (
                <div
                    key={album.id}
                    className={`relative group cursor-pointer rounded-lg overflow-hidden border-2 transition-all duration-200
                        ${currentAlbum === album ? "border-blue-600" : "border-transparent hover:border-blue-400"}`}
                    onClick={() => setCurrentAlbum(album)}>
                    <div className="w-12 h-12 relative">
                        <Image
                            src="/album.png"
                            alt={album.title}
                            fill
                            className="object-cover rounded-md " />
                    </div>
                </div>
            ))}
        </div>
    )
}

export default AlbumTabSelector