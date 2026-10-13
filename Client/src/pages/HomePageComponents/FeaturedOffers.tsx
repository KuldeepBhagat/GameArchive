import { useState, useRef } from "react"
import ButtonArrowLeft from "../../assets/icons/HomePage/buttonArrowLeft.svg?react"
import ButtonArrowRight from "../../assets/icons/HomePage/buttonArrowRight.svg?react"


export default function () {

    const Card = [
        { id: 1 },
        { id: 2 },
        { id: 3 },
        { id: 4 },
        { id: 5 },
        { id: 6 },
        { id: 7 },
        { id: 8 },
        { id: 9 },
        { id: 10 },
        { id: 11 },
        { id: 12 },
        { id: 13 }
    ]

    const buttonStyle = `bg-white h-15 w-15 rounded-xl absolute 
                         transition-all ease-in-out duration-500 
                         justify-center items-center hidden md:flex`

    const [cards, setCards] = useState(Card)
    const scrollRef = useRef<HTMLDivElement>(null)
    const [leftScrollButton, SetLeftScrollButton] = useState(false)
    const [rightScrollButton, SetRightScrollButton] = useState(true) 

    const scrollRight = () => {
        if(!scrollRef.current) return;
        scrollRef.current.scrollBy({
            left: 900,
            behavior: "smooth"
        })
    }

    const scrollLeft = () => {
        if(!scrollRef.current) return;
        scrollRef.current.scrollBy({
            left: -900,
            behavior: "smooth"
        })
    }

    const HandleScroll = () => {
        if(!scrollRef.current) return;

        const {scrollLeft, scrollWidth, clientWidth} = scrollRef.current
        const maxScroll = scrollWidth - clientWidth

        if(scrollLeft > 0) {
            SetLeftScrollButton(true)
        } else {
            SetLeftScrollButton(false)
        }
        
        if(scrollLeft >= maxScroll) {
            SetRightScrollButton(false)
        } else {
            SetRightScrollButton(true)
        }
    }

    return (
        <div className=" relative w-full">
            <div 
               ref={scrollRef}
               onScroll={() => HandleScroll()}
               className="flex gap-3 items-center overflow-x-auto scrollbar-none ">
                <button onClick={() => scrollLeft()} 
                   className={` ${buttonStyle} -left-2
                     ${leftScrollButton? 
                       "opacity-100 scale-100" : "opacity-0 scale-70" }`}>
                    <ButtonArrowLeft className="h-6 w-6 rounded-full" />
                    </button>

                {cards.map((C) => (
                    <div
                        key={C.id}
                        className="bg-amber-300 h-110 w-80 rounded-sm shrink-0">
                            {C.id}
                    </div>
                ))}
                
                <button onClick={() => scrollRight()} 
                   className={` ${buttonStyle} -right-2 
                    ${rightScrollButton?
                        "opacity-100 scale-100" : "opacity-0 scale-70"
                    } `}>
                        <ButtonArrowRight className="h-6 w-6 rounded-full" />
                    </button>
            </div>
        </div>
    )
}