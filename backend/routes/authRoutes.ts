import express from "express";
import {
  getUserProfile,
  Login,
  Logout,
  RegisterUser,
} from "../controllers/authController.js";
import userAuth from "../middlewere/userAuth.js";

const AuthRouter = express.Router();

AuthRouter.post("/register", RegisterUser);
AuthRouter.post("/login", Login);
AuthRouter.get("/profile", userAuth, getUserProfile);
AuthRouter.post("/logout", userAuth, Logout);

export default AuthRouter;
