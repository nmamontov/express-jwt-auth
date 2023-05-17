import express from "express";
import { loginOne, registerOne }  from "../controllers/user.controller";
const route = express.Router();

route.post('/login', loginOne);
route.post('/register', registerOne);

export default route;
