import { ProfileView, SelectorProps } from "@/types/types"

const tabs: ProfileView[] = ["Profile", "Gallery", "Videos"]

const ProfileTabSelector = ({ selectedTab, setSelectedTab }: SelectorProps) => {
    return (
        <div className="bg-gray-100 rounded-xl shadow-md px-4 py-2 flex justify-center gap-4 w-[400px] mx-auto mt-6">
            <ul className="flex justify-center gap-6">
                {tabs.map((tab) => (
                    <li
                        key={tab}
                        onClick={() => setSelectedTab(tab)}
                        className={`cursor-pointer pb-1 transition font-medium ${selectedTab === tab
                                ? "text-blue-400 border-b-2 border-blue-400"
                                : "text-gray-500 hover:text-blue-500"}`}>
                        {tab}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default ProfileTabSelector