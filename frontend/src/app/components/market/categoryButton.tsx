
type CategoryButtonPops = {
    category: string
    onClick: () => void
}

const CategoryButton = ({category, onClick}: CategoryButtonPops) => {
    return (
        <button
            type="button"
            className="px-4 py-2 rounded-xl shadow text-sm font-medium transition bg-blue-100 text-blue-800 hover:bg-blue-200"
            onClick={onClick}>
            {category}
        </button>
    )
}

export default CategoryButton