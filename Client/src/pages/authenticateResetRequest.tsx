export default function AuthenticateResetRequest() {

    async function Authenticate(newPassword: string) {
        try {
            const queryString = window.location.search
            const params = new URLSearchParams(queryString)
            const token = params.get('token')
            const email = params.get('email')
            const payload = {token, email, newPassword}
            const response = await fetch("/user/resetPasswordValidation", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            })
            const data = await response.json()
            console.log(data.message)
        } catch(error) {
            if(error instanceof Error) {
                console.log(error.message)
            }
        }
    }
    function Handler(event: React.SubmitEvent<HTMLFormElement>) {
        event.preventDefault()
        
        const formData = new FormData(event.target)
        const newPasswrod = formData.get('password') as string
        Authenticate(newPasswrod)
    }
    return (
        <div>
            <form onSubmit={Handler}>
                <input type="text" name="password" />
                <label htmlFor="">Enter New Password</label>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}