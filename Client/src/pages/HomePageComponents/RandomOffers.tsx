import { useState } from "react"

export default function RandomOffers() {

     const [cards, setCards] = useState([
        {id: 1},
        {id: 2},
        {id: 3},
        {id: 4},
        {id: 5},
        {id: 6}
     ])

     const [cardContainer, setCardContainer] = useState([
        {id: 1},
        {id: 2},
        {id: 3}
     ])

    return (
        <div className="w-full flex flex-col gap-2">
            {cardContainer.map((Container) => (
                <div className="border-2 shadow-2xl rounded-md h-full">
                <div className="flex justify-between items-center p-3">
                    <h1 className="text-2xl font-bold">Top deal with 80% off</h1>
                    <button className="text-white bg-black rounded-xl p-1 px-3 font-bold text-md
                                         cursor-pointer hover:scale-115 transition-all ease-in-out ">
                        <p className="">more</p>
                    </button>
                </div>
                <div className=" grid grid-cols-3 gap-2 sm:flex md:justify-center p-1 overflow-x-hidden">
                    {cards.map((C) => (
                        <div 
                        key={C.id}
                        className="bg-orange-600 w-full h-60 sm:w-50 sm:shrink-0 rounded-sm">
                    </div>
                    ))}
                </div>
            </div>
            ))}
        </div>
    )
}