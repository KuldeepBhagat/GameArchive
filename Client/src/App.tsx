import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Verify from "./pages/Verify";
import SignIn from "./pages/SignIn"
import Error from "./pages/Error";
import ChangePassword from "./pages/changePassword"
import ResetPassword from "./pages/ResetPassword";
import FailedVerification from "./pages/FailedVerification";
import AuthenticateResetRequest from "./pages/authenticateResetRequest";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signUp" element={<SignUp />} />
      <Route path="/verify" element={<Verify/>} />
      <Route path="/signIn" element={<SignIn />} />
      <Route path="/error" element={<Error />} />
      <Route path="/changePass" element={<ChangePassword/>} />
      <Route path="resetPassword" element={<ResetPassword/>} />
      <Route path="/authenticateReset" element={<AuthenticateResetRequest/>} />
      <Route path="/verifyRetry" element={<FailedVerification/>}/>
    </Routes>
  )
}