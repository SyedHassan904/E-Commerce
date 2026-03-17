import express from "express";
import userAuth from "../middlewares/userAuth.js"
import { registerUser, loginUser, getAllUsers, getUserProfile, socialLogin} from "../controllers/userController.js";
const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/social-login", socialLogin);
userRouter.get("/all", getAllUsers);
userRouter.post("/getUserProfile",userAuth,  getUserProfile);
export default userRouter;