import { Link } from "react-router-dom"

export default function Home() {
    return (
        <div className="">
            this is home page
            <Link to="/signUp"
              className="p-1">
            signUp
            </Link>

            <Link to="/signIn" 
            className="p-1">
            signIn</Link>
        </div>
    )
}