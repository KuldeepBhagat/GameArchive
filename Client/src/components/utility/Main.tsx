import Authorization from "./Authentication";
export default function Main() {

    async function Request() {

        const authCred = {
            username: "kuldeep123",
            password: "dlkwjadlkawj"
        }

        const response = await fetch("/api/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(authCred)
        })
        const Data = await response.json();
        console.log(Data.data)
    } 

    return (
        <div>
           <Authorization/>
        </div>
    )
}