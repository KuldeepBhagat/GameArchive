export default function ResetPassword() {

    async function changePassword() {
        try {

            const response  = await fetch("user/changePassword", {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({password: "kuldeep1122", newPassword: "Kuldeep@1122"})
            })

            const data = await response.json()
            console.log(data)

        } catch(error) {
            if(error instanceof Error) {
                console.log(error.message)
            }
        }
    }

    function Starter(event: React.MouseEvent<HTMLButtonElement>) {
        changePassword()
    }

    return (
        <div>
            <button onClick={Starter}>Change</button>
        </div>
    )
}