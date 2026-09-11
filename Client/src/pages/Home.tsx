import { Link } from "react-router-dom"
import { useLocation } from "react-router-dom"

export default function Home() {
    
    const location = useLocation()
    const userData = location.state || {}
    if(userData.usernaem && userData.email) console.log(userData)
    
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