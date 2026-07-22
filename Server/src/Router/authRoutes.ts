import { Router } from "express";
import {registerUser} from "../Controller/authController"

const router = Router();

router.post("/register", registerUser)

export default router
