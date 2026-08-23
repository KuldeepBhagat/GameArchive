import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn"
import Error from "./pages/Error";
import ForgetPassword from "./pages/ResetPassword"

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/signUp" element={<SignUp />} />
      <Route path="/signIn" element={<SignIn />} />
      <Route path="/error" element={<Error />} />
      <Route path="/forget" element={<ForgetPassword/>} />
    </Routes>
  )
}