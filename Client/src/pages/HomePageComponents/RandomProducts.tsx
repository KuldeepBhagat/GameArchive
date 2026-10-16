import {useState} from "react"

export default function RandomProducts() {
    interface items {
        id: number
    }

    const generateItems = (count: number): items[] => {
        return Array.from({length: count}, (_, index) => ({
            id: index
        }))
    }

    const [cards, setCards] = useState<items[]>(() => generateItems(32))

    return (
        <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-4 justify-items-center">
            {cards.map((C) => (
                <div className="bg-pink-400 w-50 h-80 sm:w-70 rounded-sm">

            </div>
            ))}
        </div>
    )
}