
type Props = {
    isVideo: boolean
    url: string
}
const MediaCard = ({ isVideo, url }: Props) => {
    return (
        <div className="relative bg-white shadow rounded-xl p-3 w-48 h-[170px] hover:shadow-lg transition cursor-pointer">
            <div className="relative aspect-video rounded-lg overflow-hidden">
                <div className="relative w-40 h-40 rounded-xl overflow-hidden shadow">
                    {isVideo ? (
                        <video
                            src={url}
                            className="object-cover w-full h-full"
                            muted
                            controls/>
                    ) : (
                        <img
                            src={url}
                            alt="Media"
                            className="object-cover w-full h-full"/>
                    )}
                </div>
            </div>

            <div className="mt-2 text-center">
                <p className="text-sm text-gray-500 italic">Likes count</p>
            </div>
        </div>
    )
}

export default MediaCard