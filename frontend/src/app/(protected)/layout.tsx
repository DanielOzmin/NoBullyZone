import { Children } from "react"
import LeftSideBar from "../components/layout/LeftSideBar"
import Navbar from "../components/layout/Navbar"
import RightSideBar from "../components/layout/RightSideBar"


const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="h-screen flex flex-col">
            <Navbar />
            <div className="flex flex-1 overflow-hidden">
                <div className="w-64 bg-gray-100 z-10">
                    <LeftSideBar />
                </div>

                <main className="flex-1 overflow-y-auto bg-white p-8">
                    {children}
                </main>

                <div className="w-64 z-10">
                    <RightSideBar />
                </div>
            </div>
        </div>
    )
}

export default ProtectedLayout