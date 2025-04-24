import { Router } from "express";
import verify from "../controllers/verifyEmail.js";

const router = Router()

router.route('/verify').post(verify)

export default router