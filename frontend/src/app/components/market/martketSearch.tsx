
type SearchProps ={
    search: string
    setSearch: React.Dispatch<React.SetStateAction<string>>
    isLocation: boolean
}

const MarketSearch = ({search, setSearch, isLocation}:SearchProps) => {
    return (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">{isLocation ? "Location":"Search"}</label>
          <input
            type="text"
            placeholder={isLocation?"Search by location" :"Search by title"}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"/>
        </div>
    )
}

export default MarketSearch