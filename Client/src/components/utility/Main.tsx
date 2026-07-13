export default function Main() {

    async function HandleSignIn(cred: { username: string, email: string, password: string }) {
        console.log("started fetching")
        const response = await fetch(`http://localhost:5000/api/test`, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(cred)
        })
        //const result = await response.json();
        //console.log(result)
    }

    function HandleAuth(type: "signin" | "signup", e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault();

        const data = new FormData(e.currentTarget);

        if (type == "signup") {
            const email = data.get("email") as string;
            const username = data.get("username") as string;
            const password = data.get("password") as string;

            HandleSignIn({ username, email, password })
        }

    }


    return (
        <div className="flex flex-col justify-center items-center text-xl">
            <h1>Form</h1>

            <div >
                <h1>Sign Up</h1>
                <form onSubmit={(e) => HandleAuth("signup", e)} className="flex flex-col">
                    <label htmlFor="email">email</label>
                    <input type="text" name="email" className="border outline-none" />
                    <label htmlFor="userName">User Name</label>
                    <input type="text" name="username" className="border outline-none" />
                    <label htmlFor="password">password</label>
                    <input type="text" name="password" className="border outline-none" />
                    <button type="submit">Submit</button>
                </form>
            </div>

            <div>
                <h1>Sign In</h1>
                <form action="" className="flex flex-col">
                    <label htmlFor="identity">userName/email</label>
                    <input type="text" className="border outline-none" />
                    <label htmlFor="userName">password</label>
                    <input type="text" className="border outline-none" />
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    )
}