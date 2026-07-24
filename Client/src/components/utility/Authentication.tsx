import { useState } from "react";

export default function Authorization() {

    const [registerError, setRegisterError] = useState<Record<string, string[]>>({})
    const [loginError, setLoginError] = useState<Record<string, string[]>>({})

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
                try {
                    const errorData = await response.json();
                    if (response.status == 400) {
                        setRegisterError(errorData.details)
                    }
                    backendError = `${method} failed at ${response.url} status: ${response.status} message: ${errorData.error}`
                } catch (error) {
                    backendError = `${method} failed at ${response.url} status: ${response.status}`
                }
                throw new Error(backendError)
            }

            const data = await response.json()
            setRegisterError({})

        } catch (error) {
            if (error instanceof Error) {
                console.error(error.message)
            }
        }
    }

    async function HandleSignIn(formData: { [k: string]: string }) {
        const api_endpoint = "/user/signin"
        const method = "POST"

        try {
            const response = await fetch(api_endpoint, {
                method: method,
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            })

            if (!response.ok) {
                let backendError = "An unknow error occurred"
                try {
                    const errorData = await response.json();

                    if (response.status == 400) {
                        setLoginError(errorData.details)
                    } else if (response.status === 401) {
                        console.log(errorData.error)
                    }

                    backendError = `${method} failed at ${response.url} status: ${response.status} message: ${errorData.error}`
                } catch (error) {
                    backendError = `${method} failed at ${response.url} status: ${response.status}`
                }
                throw new Error(backendError)
            }

            const data = await response.json()
            console.log(data.user)
            console.log(data.token)
            
            setLoginError({})

        } catch (error) {
            if (error instanceof Error) {
                console.error(error.message)
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
        } else {
            HandleSignIn(formEnteries)
        }
    }

    return (
        <div className="flex flex-col gap-5">
            <form className="flex flex-col" onSubmit={HandleFrom} name="signup">
                <label htmlFor="">User Name</label>
                <input className="outline-none border" type="text" name="username" />
                <div className="h-5">
                    {registerError.username && (
                        <p className="text-red-600 text-sm">{registerError.username[0]}</p>
                    )}
                </div>
                <label htmlFor="">Email</label>
                <input className="outline-none border" type="text" name="email" />
                <div className="h-5">
                    {registerError.email && (
                        <p className="text-red-600 text-sm">{registerError.email[0]}</p>
                    )}
                </div>
                <label htmlFor="">Password</label>
                <input className="outline-none border" type="text" name="password" />
                <div className="h-5">
                    {registerError.password && (
                        <p className="text-red-600 text-sm">{registerError.password[0]}</p>
                    )}
                </div>
                <button type="submit" >Submit</button>
            </form>

            <form className="flex flex-col" onSubmit={HandleFrom} name="signin">
                <label htmlFor="">Email</label>
                <input className="outline-none border" type="text" name="email" />
                <div className="h-5">
                    {loginError.email && (
                        <p className="text-red-600 text-sm">{loginError.email[0]}</p>
                    )}
                </div>

                <label htmlFor="">Password</label>
                <input className="outline-none border" type="text" name="password" />
                <div className="h-5">
                    {loginError.password && (
                        <p className="text-red-600 text-sm">{loginError.password[0]}</p>
                    )}
                </div>
                <button type="submit" >Submit</button>
            </form>
        </div>
    )
}