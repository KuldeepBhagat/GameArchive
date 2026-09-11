import { Router } from "express";
import {registerUser} from "../Controller/registerController"
import { signIn } from "../Controller/signinController";
import { AuthenticateRequest } from "../middleware/authMiddleware";
import { changePassword } from "../Controller/changePasswordController";
import { changeUsername } from "../Controller/changeUsernameController";
import { OtpVerify } from "../Controller/verificationController";
import { VerificationRetry } from "../Controller/failedVerificationController";

const router = Router();

router.post("/register", registerUser)
router.post("/signin", signIn)
router.post("/verify", OtpVerify)
router.post("/verifyRetry", VerificationRetry)
router.post("/changePassword", AuthenticateRequest, changePassword)
router.post("/changeUsername", AuthenticateRequest, changeUsername)
export default router
