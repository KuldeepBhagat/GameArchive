import { Router } from "express";
import {registerUser} from "../Controller/registerController"
import { signIn } from "../Controller/signinController";
import { authenticateToken } from "../middleware/authMiddleware";
import { changePassword } from "../Controller/changePasswordController";
import { changeUsername } from "../Controller/changeUsernameController";

const router = Router();

router.post("/register", registerUser)
router.post("/signin", signIn)
router.post("/changePassword", authenticateToken, changePassword)
router.post("/changeUsername", authenticateToken, changeUsername)
export default router
