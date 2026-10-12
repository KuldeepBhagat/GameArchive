import { useState, useRef } from "react"

export default function Highlights() {
    const initialCards = [
        { id: 1, color: "bg-green-500" },
        { id: 2, color: "bg-red-500" },
        { id: 3, color: "bg-slate-500" },
        { id: 4, color: "bg-yellow-500" },
        { id: 5, color: "bg-orange-500" }
    ]

    const [highlight] = useState(initialCards)
    const [activeIndex, setActiveIndex] = useState(0)
    const scrollRef = useRef<HTMLDivElement>(null)


    const HandleSlide = () => {
        if (!scrollRef.current) return;
        const { scrollLeft, clientWidth } = scrollRef.current
        const currentIndex = Math.round(scrollLeft / clientWidth)
        setActiveIndex(currentIndex)
    }

    const handleIndex = (index: number) => {
        if (!scrollRef.current) return;
        const clientWidth = scrollRef.current.clientWidth
        scrollRef.current.scrollTo({
            left: index * clientWidth,
            behavior: "smooth"
        })
    }

    return (
        <div className="w-full relative">
            <div ref={scrollRef} onScroll={() => HandleSlide()} 
            className=" w-full h-70 flex overflow-x-auto snap-x snap-mandatory scroll-smooth scrollbar-none">
                {highlight.map((cards) => (
                    <div
                    key={cards.id}
                        className={`${cards.color} w-full shrink-0 h-full snap-center snap-always`}>
                    </div>
                ))}
            </div>
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                {highlight.map((cards, index) => (
                    <button key={cards.id}
                    onClick={() => handleIndex(index)}
                        className={`h-2.5 w-2.5 bg-amber-300 rounded-4xl transition-all ease-in-out duration-300 cursor-pointer
                        ${activeIndex === index
                                ? "w-8 bg-white"
                                : "w-2.5 bg-white/50 hover:bg-white/75"
                            }`}>
                    </button>
                ))}
            </div>
        </div>
    )
}