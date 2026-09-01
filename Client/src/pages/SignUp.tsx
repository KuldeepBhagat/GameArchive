import User from "../assets/icons/user.svg?react"
import Email from "../assets/icons/email.svg?react"
import Password from "../assets/icons/password.svg?react"
import RightArrow from "../assets/icons/rightArrow.svg?react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import AppError from "../components/customMethods/AppError"
import signUpImage from "../assets/background/authenticationBackground.jpg"

export default function SignUp() {

    const navigate = useNavigate()

    const [registerError, setRegisterError] = useState<Record<string, string[]>>({})

    async function HandleSignUp(FormData: { [k: string]: string }) {

        const api_endpoint = "/user/register"
        const method = "POST"

        try {
            const response = await fetch(api_endpoint, {
                method: method,
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(FormData)
            })

            if (!response.ok) {
                let backendError = "An unknow error occurred"
                let errorMessage = "Can't establish connection"
                try {
                    const errorData = await response.json();
                    if (response.status == 400) {
                        setRegisterError(errorData.details)
                        return;
                    }
                    backendError = `${method} failed at ${response.url} status: ${response.status}`
                    errorMessage = "Internal Server Error"
                    console.log(errorData.error)
                } catch (error) {
                    if(error instanceof Error) { backendError = error.message }
                }
                throw new AppError(errorMessage, {cause: backendError})
            }
            if(response.ok) {
                const data = await response.json()
                if(data.success) {
                    navigate("/verify", {state: {
                        email: data.email
                    }})
                }
            }
            setRegisterError({})
        } catch (error) {
            if (error instanceof AppError) {
                console.error(error.details)
                navigate("/error", {state: {
                    message: error.message,
                    details: error.details
                }})
            }
        }
    }

    function HandleFrom(event: React.SubmitEvent<HTMLFormElement>) {
        event.preventDefault();
        const formtype = event.currentTarget.name

        const creds = new FormData(event.currentTarget)
        const formEnteries = Object.fromEntries(creds.entries()) as Record<string, string>;

        if (formtype == "signup") {
            HandleSignUp(formEnteries)
        }
    }

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
        <div className="fixed w-full h-full flex justify-center items-center 
                      md:bg-amber-50 
                      md:justify-center">
            <div className="flex flex-col justify-center
                          md:bg-green-300
                            md:rounded-l-xl
                            md:w-150 md:h-150
                            ">
                <div className="flex flex-col p-6 gap-1">
                    <h1 className="text-3xl font-bold">Sign Up</h1>
                    <p className="text-black/50">please sign up to continue</p>
                </div>
                <form action="" className=" gap-2 text-md p-6 w-md 
                                            flex flex-col justify-cente 
                                            items-center self-center"
                    onSubmit={HandleFrom} name="signup">
                    <div className={InputContainerStyle}>
                        <User className={IconStyle} />
                        <div className="flex flex-col w-full rounded-md p-2">
                            <label htmlFor="" className={LabelStyle}>User name</label>
                            <input type="text" name="username" className="cursor-pointer text-lg outline-none pt-1 h-6 focus:placeholder-transparent " placeholder="User name" />
                        </div >
                    </div>
                    <div className="h-5 ">
                        {registerError.username && (
                            <p className="text-red-600 text-sm">{registerError.username[0]}</p>
                        )}
                    </div>
                    <div className={InputContainerStyle}>
                        <Email className={IconStyle} />
                        <div className="flex flex-col w-full rounded-md p-2">
                            <label htmlFor="" className={LabelStyle}>Email</label>
                            <input type="text" name="email" className="cursor-pointer text-lg outline-none pt-1 h-6 focus:placeholder-transparent " placeholder="Email" />
                        </div >
                    </div>
                    <div className="h-5 ">
                        {registerError.email && (
                            <p className="text-red-600 text-sm">{registerError.email[0]}</p>
                        )}
                    </div>
                    <div className={InputContainerStyle}>
                        <Password className={IconStyle} />
                        <div className="flex flex-col w-full rounded-md p-2">
                            <label htmlFor="" className={LabelStyle}>Password</label>
                            <input type="text" name="password" className="cursor-pointer text-lg outline-none pt-1 h-6 focus:placeholder-transparent " placeholder="Password" />
                        </div >
                    </div>
                    <div className="h-5 ">
                        {registerError.password && (
                            <p className="text-red-600 text-sm">{registerError.password[0]}</p>
                        )}
                    </div>
                        
                        <button type="submit"
                        className="self-end 
                            bg-amber-300 rounded-xl 
                            font-bold text-lg 
                            py-3 px-5 mt-7 flex text-white
                            cursor-pointer
                            items-center gap-2">SIGN UP <RightArrow /></button>
                </form>
            </div>
            <div className="hidden md:flex bg-green-300 w-150 h-150 rounded-r-xl items-center justify-start">
                <div className="flex items-center justify-center bg-red-500 w-140 h-135 rounded-4xl">
                    <img src={signUpImage} alt="image" className="object-cover w-full h-full rounded-4xl"/>
                </div>
            </div>
        </div>
    )
}
