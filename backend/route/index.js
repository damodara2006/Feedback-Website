import { Router } from "express";
import verify from "../controllers/verifyEmail.js";
import imageupload from "../controllers/bug.js";
import upload from "../middleware/index.js";
import submit from "../controllers/submit.js";

const router = Router()

router.route('/verify').post(  verify)
router.route('/bugupload').post( upload.any(),imageupload)
router.route('/submit').post( upload.any(),submit)


export default router