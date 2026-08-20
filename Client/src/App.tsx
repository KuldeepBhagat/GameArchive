import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn"
export default function App() {
  return (
      <Routes>
        <Route path="/" element={<SignUp/>} />
        <Route path="/signUp" element={<SignUp/>} />
        <Route path="/signIn" element={<SignIn/>} />
      </Routes>
  )
}