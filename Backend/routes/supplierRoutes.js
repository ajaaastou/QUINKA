import express from "express";
import { 
    getAllSuppliers, 
    getSupplierById, 
    createSupplier, 
    updateSupplier, 
    deleteSupplier 
} from "../controllers/supplierController.js";
import auth from '../middleware/auth.js';

const router = express.Router();

 //publiques 
router.get('/', getAllSuppliers);
router.get('/:id', getSupplierById);

// routes necessitant authentification
router.post('/new', auth, createSupplier);
router.put('/:id', auth, updateSupplier);
router.delete('/:id', auth, deleteSupplier);

export default router;
