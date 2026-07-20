import { useState } from "react";

export default function Authorization() {

    const [fieldError, setfieldError] = useState<Record<string, string[]>>({})

    function showError() {
        console.log(fieldError)
    }

    async function HandleSignUp(FormData: {[k: string]: string;}) {

        const api_endpoint = "/api/register"
        const method = "POST"
        try {
            const response = await fetch(api_endpoint, {
                method: method,
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(FormData)
            })

            if(!response.ok) {
                let backendError = "An unknow error occurred"
                try {
                    const errorData = await response.json();
                    if(response.status == 400) {
                        setfieldError(errorData.details)
                        console.log(errorData.details)
                    }
                    backendError = `${method} failed at ${response.url} status: ${response.status} message: ${errorData.error}`
                } catch (error) {
                    backendError = `${method} failed at ${response.url} status: ${response.status}`
                }
                throw new Error(backendError)
            }
            const data = await response.json()
            setfieldError({})
            console.log(data)

        } catch (error) {
            if(error instanceof Error) {
                console.error(error.message)
            }
        }
    }

    function HandleFrom(event: React.SubmitEvent<HTMLFormElement>) {
        event.preventDefault();
        const formtype = event.currentTarget.name

        const creds = new FormData(event.currentTarget)
        const formEnteries = Object.fromEntries(creds.entries()) as Record<string, string>;

        if(formtype == "signup") {
            HandleSignUp(formEnteries)
        } else {
            console.log("signin")
        }
    }

    return (
        <div className="flex flex-col gap-5">
            <form className="flex flex-col" onSubmit={HandleFrom} name="signup">
                <label htmlFor="">User Name</label>
                <input className="outline-none border" type="text" name="username" />
                <div className="h-5">
                    {fieldError.username && (
                        <p className="text-red-600 text-sm">{fieldError.username[0]}</p>
                    )}
                </div>
                <label htmlFor="">Email</label>
                <input className="outline-none border" type="text" name="email" />
                <div className="h-5">
                    {fieldError.email && (
                        <p className="text-red-600 text-sm">{fieldError.email[0]}</p>
                    )}
                </div>
                <label htmlFor="">Password</label>
                <input className="outline-none border" type="text" name="password" />
                <div className= "h-5">
                    {fieldError.password && (
                        <p className="text-red-600 text-sm">{fieldError.password[0]}</p>
                    )}
                </div>
                <button type="submit" >Submit</button>
            </form>

            <form className="flex flex-col" onSubmit={HandleFrom} name="signin">
                <label htmlFor="">Email</label>
                <input className="outline-none border" type="text" name="username"  />

                <label htmlFor="">Password</label>
                <input className="outline-none border" type="text" name="username" />

                <button type="submit" >Submit</button>
            </form>
        </div>
    ) 
}