import express from "express";
import { userarea } from "../controllers/user.controller";
const route = express.Router();

route.get("/", userarea);


export default route;
