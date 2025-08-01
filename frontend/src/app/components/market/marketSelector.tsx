'use client'

import { useEffect, useRef, useState } from "react"

type MarketSelectorProps = {
    onChange: (val: string) => void
    isType: boolean
    options: string[]
}

const MarketSelector = ({ onChange, isType, options}: MarketSelectorProps) => {
    const [showDropdown, setShowDropdown] = useState(false)
    const [filteredOptions, setFilteredOptions] = useState<string[]>(options)
    const [value, setValue] = useState<string>("")
    const wrapperRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setShowDropdown(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])


    useEffect(()=>{
        const filtered = options.filter(o => o.toLocaleLowerCase().includes(value.toLocaleLowerCase()))
        setFilteredOptions(filtered)
    },[value])

    useEffect(() => {
        setFilteredOptions(options)
        setValue("")
    }, [options])

    return (
        <div className="relative" ref={wrapperRef}>
            <label className="block text-sm font-medium text-gray-700 mb-1">{isType? "Tpye" : "Category"}</label>
            <input
                type="text"
                className="w-full border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Select or type category"
                value={value}
                onClick={() => setShowDropdown(true)}
                onChange={(e) => {
                    const inputValue = e.target.value
                    setValue(inputValue)
                    if (inputValue === "") {
                        onChange("") }}}/>
            {showDropdown && (
                <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-md max-h-40 overflow-y-auto">
                    {filteredOptions.map((item) => (
                        <li
                            key={item}
                            onClick={() => {
                                onChange(item)
                                setShowDropdown(false)
                                setValue(item)
                            }}
                            className="px-4 py-2 cursor-pointer hover:bg-blue-50 text-gray-700">
                            {item}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default MarketSelector