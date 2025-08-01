'use client'

import { usePostContext } from "@/hooks/usePostHook"
import { Post } from "@/types/models"
import { ImageIcon } from "lucide-react"
import { useRef, useState } from "react"

type PostFromProps = {
    postId?: string
    initialContent?: string
    initialMediaUrls?: string[]
    mode: "Create" | "Update"
    setPost?: React.Dispatch<React.SetStateAction<Post>>
    setIsEditing?: React.Dispatch<React.SetStateAction<boolean>>
}

const PostForm = ({ postId, initialContent, initialMediaUrls, mode, setPost, setIsEditing }: PostFromProps) => {
    const [content, setContent] = useState(initialContent || "")
    const [files, setFiles] = useState<File[]>([])
    const [previewUrls, setPreviewUrls] = useState<string[]>(initialMediaUrls || [])
    const fileInputRef = useRef<HTMLInputElement | null>(null)
    const { getPosts } = usePostContext()


    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selected = e.target.files
        if (!selected) return

        const selectedFiles = Array.from(selected)
        setFiles(selectedFiles)

        const previews = selectedFiles.map((file) => URL.createObjectURL(file))
        setPreviewUrls((prev) => [...prev, ...previews])
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        const formData = new FormData()
        formData.append("content", content)
        files.forEach((file) => formData.append("files", file))

        console.log("Beküldés:", formData)
        try {
            const url = mode === "Create" ? `/api/Post/createPost` : `/api/Post/updatePost/${postId}`
            const method = mode === "Create" ? "POST" : "PUT"
            const res = await fetch(`${url}`, {
                method,
                credentials: "include",
                body: formData,
            })

            if (!res.ok) {
                throw new Error("Something go wrong!")
            }

            const post = await res.json()
            console.log("Success:", post)
            setContent("")
            setFiles([])
            setPreviewUrls([])
            if(setPost) setPost(post)
            if(setIsEditing) setIsEditing(false)
            await getPosts()
        } catch (error) {
            console.error("Unexpected error: ", error)
        }
    }

    const handleIconClick = () => {
        fileInputRef.current?.click()
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-xl space-y-4">
            <div className="relative">
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    onInput={(e) => {
                        const target = e.target as HTMLTextAreaElement
                        target.style.height = "auto"
                        target.style.height = `${target.scrollHeight}px`
                    }}
                    placeholder="What is in your mind today?"
                    rows={1}
                    className="w-full p-3 text-base border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-sky-400 overflow-hidden" />

                <button
                    type="button"
                    onClick={handleIconClick}
                    className="absolute bottom-2 right-2 text-sky-600 hover:text-sky-800"
                    title="Media create">
                    <ImageIcon className="w-6 h-6" />
                </button>

                <input
                    ref={fileInputRef}
                    type="file"
                    onChange={handleFileChange}
                    accept="image/*,video/*"
                    className="hidden"
                    multiple />
            </div>

            {previewUrls.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {previewUrls.map((url, i) =>
                        url.includes("video") ? (
                            <video key={i} src={url} controls className="max-h-48 rounded-lg" />
                        ) : (
                            <img key={i} src={url} alt={`Preview ${i}`} className="max-h-48 rounded-lg object-cover" />)
                    )}
                </div>
            )}

            <button
                type="submit"
                className="w-full bg-sky-500 text-white py-2 px-4 rounded-lg hover:bg-sky-600 transition">
                {mode === "Create" ? "Create Post" : "Update Post"}
            </button>
        </form>
    )
}

export default PostForm