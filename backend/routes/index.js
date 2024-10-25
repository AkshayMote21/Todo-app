import { Router } from "express";
import AuthRoutes from './auth.routes.js';
import TodoRoutes from './todo.routes.js';

const router = Router();
router.use("/auth",AuthRoutes);
router.use("/todo",TodoRoutes);

export default router;