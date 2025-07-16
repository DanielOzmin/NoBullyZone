
type OrderOption = "" | "Likes" | "Comments" | "Messages" | "Friendship time" | "Requests"
type FilterFirendsProps = {
    filterBy: OrderOption
    order: OrderOption
    setOrder: React.Dispatch<React.SetStateAction<OrderOption>> 
}

const SortButton = ({filterBy, order, setOrder}: FilterFirendsProps) => {
    const isActive = filterBy === order

    const handleClick = () => {
        setOrder(prev => (prev === filterBy ? "" : filterBy))
    }

    return (
        <button
            className={`px-4 py-2 rounded-xl shadow text-sm font-medium transition ${
                isActive ? "bg-blue-600 text-white" : "bg-blue-100 text-blue-800 hover:bg-blue-200"
            }`}
            onClick={handleClick}>
            {filterBy}
        </button>
    )
}

export default SortButton