

const tailwindLabel = "absolute left-3 top-1/2 -translate-y-1/2 bg-white px-1 text-gray-600 text-sm transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:-translate-y-1/2 peer-focus:top-0 peer-focus:text-sm peer-focus:text-blue-600 peer-focus:-translate-y-1/2"
const tailwindInput = "peer w-full border border-gray-300 rounded-lg px-3 pt-4 pb-2 placeholder-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/90 text-gray-800"
type AlbumModalProps = {
    title: string,
    setTitle: React.Dispatch<React.SetStateAction<string>>
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
    handleSubmit: () => void
}

const AddAlbumModal = ({ title, setTitle, setIsModalOpen, handleSubmit }: AlbumModalProps) => {
    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
                <form
                    onSubmit={(e) => {
                        e.preventDefault()
                        handleSubmit()
                        setIsModalOpen(false)
                    }}>
                    <h2 className="text-xl font-bold mb-6 text-center text-gray-800">Create New Album</h2>

                    <div className="relative mb-6">
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            placeholder="Album title"
                            className={tailwindInput}/>
                        <label htmlFor="title" className={tailwindLabel}>Album Title</label>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-xl transition duration-200">
                        Create Album
                    </button>

                    <button
                        type="button"
                        onClick={() => setIsModalOpen(false)}
                        className="mt-3 w-full text-gray-500 hover:text-gray-800 text-sm underline">
                        Cancel
                    </button>
                </form>
            </div>
        </div>
    )

}

export default AddAlbumModal