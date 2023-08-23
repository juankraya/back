import express from "express";
import {
  createUser,
  viewUsers,
  login,
  deleAllUsers,
  logout,
} from "../controlador/userControlador.js";
import { verifyToken } from "../controlador/middleware.js";

const router = express.Router();

router.post("/create", createUser);
router.get("/salir", logout);
router.post("/login", verifyToken, login);
router.get("/", viewUsers);
router.delete("/", deleAllUsers);

export default router;
