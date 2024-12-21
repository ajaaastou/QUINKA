import express from "express";
import { createProduct, getAllProducts, getOneProduct, updateOneProduct, deleteOneProduct } from "../controllers/productController.js";
import auth from '../middleware/auth.js';

const productRouter = express.Router();

// routes acccessibles
productRouter.get('/', getAllProducts);
productRouter.get('/:id', getOneProduct);

// Routes necessitant authentification
productRouter.post('/new', auth, createProduct);
productRouter.put('/:id', auth, updateOneProduct);
productRouter.delete('/:id', auth, deleteOneProduct);

export default productRouter;