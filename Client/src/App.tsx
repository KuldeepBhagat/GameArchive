import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./pages/UserValidation/SignUp";
import Verify from "./pages/UserValidation/Verify";
import SignIn from "./pages/UserValidation/SignIn"
import Error from "./pages/UserValidation/Error";
import ChangePassword from "./pages/UserValidation/changePassword"
import ResetPassword from "./pages/UserValidation/ResetPassword";
import FailedVerification from "./pages/UserValidation/FailedVerification";
import AuthenticateResetRequest from "./pages/UserValidation/authenticateResetRequest";

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