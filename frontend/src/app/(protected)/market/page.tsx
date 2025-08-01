'use client'

import AdCard from '@/app/components/market/adCard'
import AdForm from '@/app/components/market/adForm'
import MarketFilter from '@/app/components/market/marketSelector'
import MarketSearch from '@/app/components/market/martketSearch'
import { Ad } from '@/types/models'
import { FilePlus, Search } from 'lucide-react'

import { useEffect, useState } from 'react'

const adTypes = ["Product", "Service"]
const categories = [
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

const MarketPage = () => {
    const [adType, setAdType] = useState<string>("")
    const [category, setCategory] = useState<string>("")
    const [customCategory, setCustomCategory] = useState<string>("")
    const [title, setTitle] = useState<string>("")
    const [location, setLocation] = useState<string>("")
    const [isAdFormOpen, setIsAdFormOpen] = useState<boolean>(false)
    const [adsList, setAdsList] = useState<Ad[]>([])
    const [adsCategories, setAdsCategories] = useState<string[]>(categories)
    const [filteredList, setFilteredList] = useState<Ad[]>(adsList)



    const fetchAllAds = async () => {
        try {
            const res = await fetch("/api/Ad/getallads",
                { credentials: "include" })
            if (!res.ok) {
                throw new Error("something go wrong while fetch ads")
            }
            const data = await res.json()
            setAdsList(data)
        } catch (error) {
            console.error("Unexpected error: ", error)
        }
    }

    const handleCategoryChange = (value: string) => {
        setCategory(value)

    }

    const handleAdTypeChange = (value: string) => {
        setAdType(value)
    }

    const handleSearch = () => {
        const filteredAds = adsList.filter(ad => {
            const matchType = adType === "" || ad.adType === adType
            const matchCategory = category === "" || ad.categories.includes(category)
            const matchLocation = location === "" || ad.location.toLowerCase().includes(location.toLowerCase())
            const matchSearch = title === "" || ad.title.toLowerCase().includes(title.toLowerCase())

            return matchType && matchCategory && matchLocation && matchSearch
        })
        setFilteredList(filteredAds)
    }

    const getCategories = () => {
        if (adType === "Product") {
            setAdsCategories(productCategories)
        } else if (adType === "Service") {
            setAdsCategories(serviceCategories)
        } else {
            setAdsCategories(categories)
        }
    }


    useEffect(() => {
        getCategories()
    }, [adType])


    useEffect(() => {
        fetchAllAds()
    }, [])

    useEffect(() => {
        setFilteredList(adsList)
    }, [adsList])

    

    console.log(adsList)
    console.log(filteredList)

    return (
        <main>
            <section className="bg-white rounded-xl shadow-md px-6 py-6 w-full max-w-4xl mx-auto mt-18">
                <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">Market</h1>
                    <button className="flex item-center justify-center gap-2 mt-4 sm:mt-0 px-5 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
                        onClick={() => setIsAdFormOpen(true)}>
                        Post New Ad
                        <FilePlus className="w-5 h-5" />
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

                    <MarketFilter onChange={handleAdTypeChange} isType={true} options={adTypes} />

                    <MarketFilter onChange={handleCategoryChange} isType={false} options={adsCategories} />

                    <MarketSearch search={location} setSearch={setLocation} isLocation={true} />

                    <MarketSearch search={title} setSearch={setTitle} isLocation={false} />
                </div>

                <div className="flex justify-end mt-6 text-right">
                    <button
                        onClick={handleSearch}
                        className="flex items-center justify-center gap-2 bg-emerald-600 text-white px-6 py-2 rounded-xl hover:bg-emerald-700 transition">
                        <Search className="w-5 h-5" />
                        Search
                    </button>
                </div>
            </section>
            {isAdFormOpen && (
                <AdForm
                    onCreated={(ad) => {
                        setAdsList(prev => [ad, ...prev]);
                        setIsAdFormOpen(false)}}
                    setIsAdFormOpen={setIsAdFormOpen}/>)}
            <section>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8">
                    {filteredList.map((ad) => <AdCard key={ad.id} ad={ad} />)}
                </div>
            </section>
        </main>

    )
}

export default MarketPage
