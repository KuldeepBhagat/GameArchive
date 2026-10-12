
export default function ResetPass() {
    
    async function resetPassword() {
        try {
            const response = await fetch("/user/resetPassword", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({email: "kuldeep496242@gmail.com"})
            })
            const data = await response.json()
            console.log(data.message)
        } catch(error) {
            if(error instanceof Error) {
                console.log(error.message)
            }
        }
    }

    function handler(event: React.MouseEvent<HTMLButtonElement>) {
        resetPassword()
    }
    
    return (
        <div>
            <button onClick={handler}>Request</button>
        </div>
    )
}