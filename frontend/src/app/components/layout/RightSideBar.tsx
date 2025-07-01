

const RightSideBar = () => {
    return (
        <aside
            className="group relative transition-all duration-300 ease-in-out w-10 hover:w-64 h-full bg-gray-300 overflow-hidden ml-auto">
            <div className="absolute top-0 right-0 w-full h-full p-10">
                <h1 className="mt-24 text-right">Right Sidebar Content</h1>
            </div>
        </aside>
    )
}

export default RightSideBar
