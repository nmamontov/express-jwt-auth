import express from "express";
import userRoute from "./user.route";
import authRoute from "./auth.route";
import { auth } from "../middleware/auth";

const router = express.Router();

router.use("/user", auth, userRoute);
router.use("/", authRoute);


export default router;
