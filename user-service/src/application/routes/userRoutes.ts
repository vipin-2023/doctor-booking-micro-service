import express from "express";
import {UserController}from "../controllers/userController";
import {isAuthenticated ,isAdmin} from "../middlewares/isAuthMiddleware";

const router = express.Router();
const userController = new UserController();
//specific 
router.post("/register",userController.registerUser);
router.post("/login",userController.logInUser);
router.put("/updateClient/:id",isAuthenticated,userController.updateClient);
router.put("/updateDoctor/:id",isAuthenticated,userController.updateDoctor);

//only admin access
router.get("/getAllUsers",isAuthenticated,isAdmin,userController.getAllUser);
router.get("/getAllDoctors",isAuthenticated,isAdmin,userController.getAllDoctors);

export default router;