import express from "express";
import {AppointmentController}from "../controllers/AppointmentController";
import {isAuthenticated ,isAdmin} from "../middlewares/isAuthMiddleware";

const router = express.Router();
const appointmentController = new AppointmentController();
//specific 
router.post("/register",AppointmentController.registerUser);


export default router;