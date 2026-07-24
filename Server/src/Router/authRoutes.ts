import { Router } from "express";
import {registerUser} from "../Controller/registerController"
import { signIn } from "../Controller/signinController";

const router = Router();

router.post("/register", registerUser)
router.post("/signin", signIn)
export default router
