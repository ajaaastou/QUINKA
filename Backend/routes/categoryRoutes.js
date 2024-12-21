import express from "express";
import { createCategory, getAllCategories, getOneCategory, updateOneCategory, deleteOneCategory } from "../controllers/categoryController.js";
import auth from '../middleware/auth.js';

const categoryRouter = express.Router();

// routes acccessibles
categoryRouter.get("/", getAllCategories);
categoryRouter.get("/:id", getOneCategory);

// Routes necessitant authentification
categoryRouter.post("/new", auth, createCategory);
categoryRouter.put("/:id", auth, updateOneCategory);
categoryRouter.delete("/:id", auth, deleteOneCategory);

export default categoryRouter;