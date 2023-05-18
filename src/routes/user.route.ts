import express from "express";
import { userarea } from "../controllers/user.controller";
import { postProfile, getProfile } from "../controllers/user.profile.controller";
const route = express.Router();

route.get("/", userarea);
route.post("/profile/", postProfile);
route.get("/profile/", getProfile);

export default route;
