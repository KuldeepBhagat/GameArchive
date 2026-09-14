import { Router } from "express";
import {registerUser} from "../Controller/userRegister"
import { signIn } from "../Controller/userSignin";
import { AuthenticateRequest } from "../middleware/authMiddleware";
import { changePassword } from "../Controller/changePassword";
import { changeUsername } from "../Controller/changeUsername";
import { OtpVerify } from "../Controller/userEmailVerification";
import { VerificationRetry } from "../Controller/failedVerification";
import { resetPassword } from "../Controller/resetPasswordRequest";
import { resetPasswordValidation } from "../Controller/resetPasswordValidation";

const router = Router();

router.post("/register", registerUser)
router.post("/signin", signIn)
router.post("/verify", OtpVerify)
router.post("/verifyRetry", VerificationRetry)
router.post("/changePassword", AuthenticateRequest, changePassword)
router.post("/changeUsername", AuthenticateRequest, changeUsername)
router.post("/resetPassword", resetPassword)
router.post("/resetPasswordValidation", resetPasswordValidation)

export default router
