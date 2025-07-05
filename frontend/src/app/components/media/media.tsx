'use client'

import { Album } from "@/types/models"
import MediaCard from "./mediaCard"
import MediaCardStandard from "./mediaCardStandard"
import { useEffect, useState } from "react"
import AddAlbumModal from "./addAlbumModal"
import AlbumView from "./albumView"
import AlbumTabSelector from "./albumTabSelector"
import ModalView from "./modalView"

type MediaProps = {
    isVideo: boolean
}

const Media = ({ isVideo }: MediaProps) => {
    const [albums, setAlbums] = useState<Album[]>([])
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const [title, setTitle] = useState<string>("")
    const [selectedAlbumTitle, setSelectedAlbumTitle] = useState<string>("")
    const [currentAlbum, setCurrentAlbum] = useState<Album>()
    const [mediaIndex, setMediaIndex] = useState<number | null>(null)

    const GetAlbums = async () => {
        try {
            const res = await fetch(`/api/Media/albums?isVideo=${isVideo}`, {
                credentials: "include"
            })
            const data = await res.json()
            if (!res.ok) {
                throw new Error(`Something go wrong: ${res.status}`)
            }
            setAlbums(data)
        } catch (error) {
            console.error("Failed to fetch albums:", error)
        }

    }

    const getCurrentAlbum = () => {
        setCurrentAlbum(albums.filter(a => a.title === selectedAlbumTitle)[0])
    }

    useEffect(() => {
        GetAlbums()
    }, [])

    useEffect(() => {
        getCurrentAlbum()
    }, [selectedAlbumTitle])


    const handleSubmit = async () => {
        const albumData = { title, isVideo }
        try {
            const res = await fetch("/api/Media/createAlbum", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(albumData)
            })
            const data = await res.json()
            if (!res.ok) {
                throw new Error(`Something go wrong: ${res.status}`)
            }
            GetAlbums()
            setTitle("")
        } catch (error) {
            console.error("Failed to create album:", error)
        }
    }
    console.log(mediaIndex)

    return (
        <>
            <section className="">

                {selectedAlbumTitle && currentAlbum ? <div>
                    <div className="flex justify-center mt-6">
                        <AlbumTabSelector albums={albums} currentAlbum={currentAlbum} setCurrentAlbum={setCurrentAlbum} />
                    </div>
                    <AlbumView album={currentAlbum} setMediaIndex={setMediaIndex} />
                    {mediaIndex !== null && <ModalView mediaItems={currentAlbum.mediaItems} mediaIndex={mediaIndex} setMediaIndex={setMediaIndex} />}
                </div> : (
                    <>
                        <div className="flex justify-center p-6">
                            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 transition"
                                onClick={() => setIsModalOpen(true)}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                                Create Album
                            </button>
                        </div>
                        <div className="flex-col">
                            {albums.map((album) =>
                                <div key={album.id} className="mb-6">
                                    <div className="flex flex-wrap gap-4 items-start">
                                        <MediaCardStandard album={album} type={isVideo ? "Video" : "Image"} setSelectedAlbumTitle={setSelectedAlbumTitle} />
                                        {album.mediaItems.slice(0, 4).map((item) => (
                                            <MediaCard key={item.id} isVideo={item.isVideo} url={item.url} />
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                        {isModalOpen && <AddAlbumModal title={title} setTitle={setTitle} setIsModalOpen={setIsModalOpen} handleSubmit={handleSubmit} />}
                    </>
                )}
            </section>

        </>
    )
}

export default Media