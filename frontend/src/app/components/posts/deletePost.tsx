import { usePostContext } from "@/hooks/usePostHook"
import { X } from "lucide-react"
import { useState } from "react"

type DeletePostProps = {
    postId: string
}

const DeletePost = ({ postId }: DeletePostProps) => {
    const [showConfirm, setShowConfierm] = useState<boolean>(false)
    const {getPosts} = usePostContext()

    const handleDelete = async () => {
        try {
            const res = await fetch(`/api/Post/deletePost/${postId}`, { method: "DELETE", credentials: "include" })
            const data = await res.json()
            if (!res.ok) {
                throw new Error("something go wrong while try to delete post: ", data.message)
            }
            console.log(data)
            setShowConfierm(false)
            await getPosts()
        } catch (error) {
            console.error("unexpected error: ", error)
        }
    }

    return (
        <>
            <X className="w-6 h-6 cursor-pointer text-gray-500 hover:text-red-500" onClick={() => setShowConfierm(true)} />

            {showConfirm && (
                <div className="fixed inset-0 flex items-start justify-center pt-24 backdrop-blur-sm bg-white/0">
                    <div className="bg-white rounded-xl shadow-lg p-6 max-w-md w-full text-center">
                        <h2 className="text-lg font-semibold mb-4">Are you sure you want to delete?</h2>
                        <div className="flex justify-center gap-4">
                            <button
                                onClick={() => setShowConfierm(false)}
                                className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition">
                                Cancel
                            </button>
                            <button
                                onClick={handleDelete}
                                className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition">
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default DeletePost