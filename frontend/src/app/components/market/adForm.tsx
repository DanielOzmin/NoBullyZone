'use client'

import { ImagePlus, PlusCircle } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import CategoryButton from "./categoryButton"
import { Ad } from "@/types/models"
import MarketSelector from "./marketSelector"

const adTypes = ["Product", "Service"]
const categoriesAds = [
    "Electronics",
    "Clothing & Fashion",
    "Books",
    "Furniture",
    "Toys & Games",
    "Sports Equipment",
    "Groceries & Food",
    "Health & Supplements",
    "Tools & Hardware",
    "Art & Crafts",
    "Tutoring & Education",
    "Cleaning Services",
    "Home Repair",
    "Fitness Training",
    "Personal Coaching",
    "Event Planning",
    "Pet Services",
    "Legal Advice",
    "Translation",
    "Tech Support"
]
const productCategories = [
    "Electronics",
    "Clothing & Fashion",
    "Books",
    "Furniture",
    "Toys & Games",
    "Sports Equipment",
    "Groceries & Food",
    "Health & Supplements",
    "Tools & Hardware",
    "Art & Crafts"
]
const serviceCategories = [
    "Tutoring & Lessons",
    "Home Cleaning",
    "Repairs & Handyman",
    "IT Support",
    "Moving & Transport",
    "Beauty Services",
    "Photography & Videography",
    "Event Services",
    "Personal Training",
    "Translation Services"
]

type AdFromProps = {
    onCreated: (ad: Ad) => void
    setIsAdFormOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const AdForm = ({ onCreated, setIsAdFormOpen }: AdFromProps) => {
    const [title, setTitle] = useState<string>("")
    const [price, setPrice] = useState<string>("")
    const [description, setDescription] = useState<string>("")
    const [location, setLocation] = useState<string>("")
    const [type, setType] = useState<string>("")
    const [category, setCategory] = useState<string>("")
    const [customCategory, setCustomCategory] = useState<string>("")
    const [categories, setCategories] = useState<string[]>([])
    const [adsCategories, setAdsCategories] = useState<string[]>(categoriesAds)

    const [files, setFiles] = useState<File[]>([])
    const [previewUrls, setPreviewUrls] = useState<string[]>([])
    const fileInputRef = useRef<HTMLInputElement | null>(null)

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selected = e.target.files
        if (!selected) return

        const selectedFiles = Array.from(selected)
        setFiles(selectedFiles)

        const previews = selectedFiles.map((file) => URL.createObjectURL(file))
        setPreviewUrls(previews)
    }

    const handleTypeChange = (value: string) => { setType(value) }

    const handleCategorie = (value: string) => {

        setCategory(value)


        if (!categories.includes(value) && value !== "") {
            setCategories([...categories, value])
        }
    }

    const handleCategoryButtonClick = (cat: string) => {
        setCategories(categories.filter(c => c !== cat))
    }

    const getCategories = () => {
        if (type === "Product") {
            setAdsCategories(productCategories)
        } else if (type === "Service") {
            setAdsCategories(serviceCategories)
        } else {
            setAdsCategories(categoriesAds)
        }
    }


    useEffect(() => {
        getCategories()
    }, [type])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        const formData = new FormData()
        formData.append("title", title)
        formData.append("price", price)
        formData.append("description", description)
        formData.append("location", location)
        formData.append("type", type)
        categories.forEach((c) => formData.append("categories", c))
        files.forEach((file) => formData.append("files", file))

        try {
            const res = await fetch("/api/Ad/create", {
                method: "POST",
                credentials: "include",
                body: formData,
            })

            if (!res.ok) throw new Error("Failed to create ad.")
            const data = await res.json()
            console.log("Ad created:", data)
            onCreated(data)

            setTitle("")
            setPrice("")
            setDescription("")
            setLocation("")
            setType("")
            setCategories([])
            setCustomCategory("")
            setFiles([])
            setPreviewUrls([])
        } catch (err) {
            console.error(err)
        }
    }

    const triggerFileInput = () => {
        fileInputRef.current?.click()
    }

    console.log(categories)
    console.log(category)

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white rounded-xl shadow-md max-w-2xl mx-auto px-6 py-8 mt-6 space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <PlusCircle className="w-6 h-6 text-blue-500" />
                Post New Ad
            </h2>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                    className="w-full border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                <input
                    type="number"
                    step="0.01"
                    className="w-full border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                    rows={3}
                    className="w-full border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)} />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <input
                    className="w-full border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    required />
            </div>


            <MarketSelector isType={true} onChange={handleTypeChange} options={adTypes} />

            <MarketSelector isType={false} onChange={handleCategorie} options={adsCategories} />

            <div className="flex">
                <input
                    type="text"
                    placeholder="Or enter custom category"
                    className="w-full border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={customCategory}
                    onChange={(e) => {
                        setCustomCategory(e.target.value)
                        setCategory("")
                    }} />
                <button className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition"
                    type="button"
                    onClick={() => !categories.includes(customCategory) ? setCategories([...categories, customCategory]) : ""}>
                    Add
                </button>
            </div>
            {categories.length > 0 && categories.map((cat) =>
                <CategoryButton key={cat} category={cat} onClick={() => handleCategoryButtonClick(cat)} />)}


            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Media</label>
                <div className="flex items-center gap-4">
                    <button
                        type="button"
                        onClick={triggerFileInput}
                        className="flex items-center gap-2 bg-blue-100 text-blue-600 px-4 py-2 rounded-xl hover:bg-blue-200 transition">
                        <ImagePlus className="w-5 h-5" /> Upload Media
                    </button>
                    <input
                        ref={fileInputRef}
                        type="file"
                        multiple
                        accept="image/*,video/*"
                        onChange={handleFileChange}
                        className="hidden" />
                </div>
                {previewUrls.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                        {previewUrls.map((url, i) => (
                            url.includes("video") ? (
                                <video key={i} src={url} controls className="max-h-48 rounded-lg" />
                            ) : (
                                <img key={i} src={url} alt={`Preview ${i}`} className="max-h-48 rounded-lg object-cover" />
                            )
                        ))}
                    </div>
                )}
            </div>

            <div className="flex justify-between">
                <button
                    type="button"
                    className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition"
                    onClick={() => setIsAdFormOpen(false)}>
                    Cancel
                </button>
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition">
                    Post Ad
                </button>

            </div>
        </form>
    )
}

export default AdForm