import express from "express";
import {
  actualizarTarea,
  crearTarea,
  deleteAllTask,
  deleteTaskbyId,
} from "../controlador/tareaControlador.js";
import { verifyToken } from "../controlador/middleware.js";

const router = express.Router();

router.post("/create", verifyToken, crearTarea);
router.put("/:id", actualizarTarea);
router.delete("/", deleteAllTask);
router.delete("/:id", verifyToken, deleteTaskbyId);

export default router;
