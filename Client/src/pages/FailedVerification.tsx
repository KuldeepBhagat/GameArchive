import { useLocation } from "react-router-dom"
import AppError from "../components/customMethods/AppError"
import { useNavigate } from "react-router-dom"

export default function FailedVerification() {

    const location = useLocation()
    const state = location.state
    const navigate = useNavigate()

    async function handleVerify() {
        const api_endpoint = "/user/verifyRetry"
        const method = "POST"
        const payload = {...state}

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
                    navigate("/verify", {
                        state: {
                            email: data.email
                        }
                    })
                }
            }
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

    return (
        <div>
            <h1>Email isn't verified Please Verify to Continue</h1>
            <button onClick={handleVerify}>Verify</button>
        </div>
    )
}