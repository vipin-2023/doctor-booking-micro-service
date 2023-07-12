const express = require("express");
const router = express.Router();

import {UserController}from "../controllers/userController"

const userController = new UserController();

router.post("/register",userController.registerUser);








export default router;