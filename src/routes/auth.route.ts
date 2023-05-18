import express from "express";
import { newToken, loginOne, registerOne }  from "../controllers/auth.controller";
const route = express.Router();

route.post('/login', loginOne);
route.post('/register', registerOne);
route.post('/token', newToken);

export default route;
