import { useNavigate } from "react-router-dom"
import { useState } from "react"
import AppError from "../../components/customMethods/AppError"
import { useLocation } from "react-router-dom"


export default function Verify() {

    interface navType {
        email: string
    }

    const location = useLocation()
    const state = location.state as navType
    const navigate = useNavigate()
    const [VerificationError, setVerificationError] = useState<Record<string, string[]>>({})

    async function handleVerification(OTP: { [k: string]: string }) {
        const api_endpoint = "/user/verify"
        const method = "POST"
        const payload = {...state, ...OTP}
        console.log(payload)
        try {
            const response = await fetch(api_endpoint, {
                method: method,
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            })

            if (!response.ok) {
                let backendError = "An unknow error occurred"
                let errorMessage = "Can't establish connection"
                try {
                    const errorData = await response.json();
                    if (response.status == 400) {
                        setVerificationError(errorData.details)
                        return;
                    }
                    backendError = `${method} failed at ${response.url} status: ${response.status}`
                    errorMessage = "Internal Server Error"
                    console.log(errorData.error)
                } catch (error) {
                    if (error instanceof Error) { backendError = error.message }
                }
                throw new AppError(errorMessage, { cause: backendError })
            }
            if (response.ok) {
                const data = await response.json()
                if (data.success) {
                    navigate("/")
                }
            }
            setVerificationError({})
        } catch (error) {
            if (error instanceof AppError) {
                console.error(error.details)
                navigate("/error", {
                    state: {
                        message: error.message,
                        details: error.details
                    }
                })
            }
        }
    }

    function handleForm(event: React.SubmitEvent<HTMLFormElement>) {
        event.preventDefault()

        const data = new FormData(event.currentTarget);
        const OTP = Object.fromEntries(data) as Record<string, string>
        handleVerification(OTP)
    }

    return (
        <div>
            <form action="" onSubmit={handleForm}>
                <input type="text" name="otp" id="" className="border" />
                <button type="submit">Submit</button>
                <div className="h-5 ">
                        {VerificationError.otp && (
                            <p className="text-red-600 text-sm">{VerificationError.otp[0]}</p>
                        )}
                    </div>
            </form>
        </div>
    )
}