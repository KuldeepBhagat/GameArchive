import User from "../assets/icons/user.svg?react"
import Email from "../assets/icons/email.svg?react"
import Password from "../assets/icons/password.svg?react"
import RightArrow from "../assets/icons/rightArrow.svg?react"

export default function SignUp() {

    const InputContainerStyle = `group flex shadow-[0_1.5px_0px_rgba(0,0,0,0.25)] w-90 pb-2 rounded-sm
                                    transition-all duration-200 ease-in-out
                                    focus-within:scale-[1.02]
                                    focus-within:shadow-[0_10px_20px_rgba(0,0,0,0.2)]
                                    focus-within:-translate-y-1 `
    const IconStyle = `self-end pb-1 w-8 h-8 transition-colors 
                       duration-200 text-black/50 
                       group-focus-within:text-black`
    const LabelStyle = `opacity-0 group-focus-within:opacity-100
                        font-semibold text-sm transition-all
                        ease-in-out duration-300`

    return (
        <div className="fixed w-full h-full flex justify-center items-center">
            <div className="flex flex-col justify-center">
                <div className="flex flex-col p-6 gap-1">
                    <h1 className="text-3xl font-bold">Sign Up</h1>
                    <p className="text-black/50">please sign up to continue</p>
                </div>
                <form action="" className=" gap-6 text-md p-6 w-md flex flex-col justify-cente items-center">
                    <div className={InputContainerStyle}>
                        <User className={IconStyle} />
                        <div className="flex flex-col w-full rounded-md p-2">
                            <label htmlFor="" className={LabelStyle}>User name</label>
                            <input type="text" name="username" className="cursor-pointer text-lg outline-none pt-1 h-6 focus:placeholder-transparent " placeholder="User name" />
                        </div >
                    </div>
                    <div className={InputContainerStyle}>
                        <Email className={IconStyle} />
                        <div className="flex flex-col w-full rounded-md p-2">
                            <label htmlFor="" className={LabelStyle}>Email</label>
                            <input type="text" name="email" className="cursor-pointer text-lg outline-none pt-1 h-6 focus:placeholder-transparent " placeholder="User name" />
                        </div >
                    </div>
                    <div className={InputContainerStyle}>
                        <Password className={IconStyle} />
                        <div className="flex flex-col w-full rounded-md p-2">
                            <label htmlFor="" className={LabelStyle}>Password</label>
                            <input type="text" name="passwrod" className="cursor-pointer text-lg outline-none pt-1 h-6 focus:placeholder-transparent " placeholder="User name" />
                        </div >
                    </div>
                    <button type="submit" 
                            className="self-end 
                            bg-amber-300 rounded-xl 
                            font-bold text-xl 
                            py-4 px-6 mt-7 flex text-white
                            cursor-pointer
                            items-center gap-2">SIGN UP <RightArrow/></button>
                </form>
            </div>
        </div>
    )
}