import Logo from "../../assets/icons/HomePage/siteLogo.svg?react"
import SearchIcon from "../../assets/icons/HomePage/SearchIcon.svg?react"
import More from "../../assets/icons/HomePage/More.svg?react"
import User from "../../assets/icons/HomePage/user.svg?react"
import Cart from "../../assets/icons/HomePage/Cart.svg?react"
import LeftArrow from "../../assets/icons/HomePage/leftArrow.svg?react"
import Menu from "../../assets/icons/HomePage/menu.svg?react"

import { useState } from "react"

export default function Header() {

    const [isSearchOpen, setIsSearchOpen] = useState(false)
    const CategoryButtonStyles = `w-fit p-1 focus:border hover:scale-105 
                                  rounded-sm font-bold text-white `

    return (
        <div className="sticky top-0 z-30">
            <header className=" bg-white w-full h-12 flex items-center justify-between px-3">
                <div>
                    <Logo className="w-20 h-10" />
                </div>
                <div className=" h-10 md:border-2 md:border-blue-300 p-1 rounded-xl md:w-100 flex gap-2 items-center">
                    <button className="hidden md:block">
                        <SearchIcon className=" text-black/70" />
                    </button>

                    {/* Mobile Search Icon */}
                    <button onClick={() => setIsSearchOpen(true)} className="md:hidden">
                        <SearchIcon className=" text-black/70" />
                    </button>
                    <input type="text" className="md:w-full h-full outline-none hidden md:block" />

                    {/*Mobile searchbar View */} 
                    {isSearchOpen && (
                        <div className="bg-slate-100 fixed inset-0 z-50 md:hidden">
                            <div className="bg-white flex p-2 shadow-sm items-center gap-2">
                                <button type="button" onClick={() => setIsSearchOpen(false)}>
                                    <LeftArrow className="w-7 h-7" />
                                </button>
                                <input type="text" className=" w-full h-10 outline-none" />
                            </div>
                        </div>
                    )}

                </div>
                <div className="flex gap-3 items-center">
                    <p>More</p>
                    <More className="w-4 h-4 pt-1" />
                </div>
                <div className="flex items-center gap-3">
                    <p className="hidden md:block">Login</p>
                    <User className="w-7 h-7 text-black/60" />
                    <More className="w-4 h-4 pt-1" />
                </div>
                <div className="flex items-center gap-3">
                    <p className="hidden md:block">Cart</p>
                    <Cart className="w-7 h-7" />
                </div>
            </header>
            <div className="bg-slate-700 text-white font-bold 
                              h-10 px-3 gap-5 flex justify-between items-center
                              overflow-x-auto scrollbar-none">
                <button type="button" className={`${CategoryButtonStyles} flex items-center gap-1`}>
                    <Menu className="w-6 h-6 text-white"/>
                    All
                </button>
                <button type="button" className={`${CategoryButtonStyles}`}>
                    Fashion
                </button>
                <button type="button" className={`${CategoryButtonStyles}`}>
                    Mobile
                </button>
                <button type="button" className={`${CategoryButtonStyles}`}>
                    Electronics
                </button>
                <button type="button" className={`${CategoryButtonStyles}`}>
                    beauty
                </button>
                <button type="button" className={`${CategoryButtonStyles}`}>
                    Home
                </button>
                <button type="button" className={`${CategoryButtonStyles}`}>
                    Appliances
                </button>
                <button type="button" className={`${CategoryButtonStyles}`}>
                    Furniture
                </button>
                <button type="button" className={`${CategoryButtonStyles}`}>
                    Books
                </button>
            </div>
        </div>
    )
}