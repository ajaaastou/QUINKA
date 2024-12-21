import { Supplier } from "../models/supplier.js";


export const getAllSuppliers = async (req, res) => {
    try {
        const suppliers = await Supplier.find();
        res.status(200).json(suppliers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const getSupplierById = async (req, res) => {
    try {
        const supplier = await Supplier.findById(req.params.id);
        if (!supplier) {
            return res.status(404).json({ message: "Fournisseur non trouvé" });
        }
        res.status(200).json(supplier);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const createSupplier = async (req, res) => {
    const supplier = new Supplier({
        name: req.body.name,
        adresse: req.body.adresse,
        telephone: req.body.telephone,
        email: req.body.email
    });

    try {
        const newSupplier = await supplier.save();
        res.status(201).json(newSupplier);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


export const updateSupplier = async (req, res) => {
    try {
        const supplier = await Supplier.findById(req.params.id);
        if (!supplier) {
            return res.status(404).json({ message: "Fournisseur non trouvé" });
        }

        if (req.body.name) supplier.name = req.body.name;
        if (req.body.adresse) supplier.adresse = req.body.adresse;
        if (req.body.telephone) supplier.telephone = req.body.telephone;
        if (req.body.email) supplier.email = req.body.email;

        const updatedSupplier = await supplier.save();
        res.status(200).json(updatedSupplier);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


export const deleteSupplier = async (req, res) => {
    try {
        const supplier = await Supplier.findById(req.params.id);
        if (!supplier) {
            return res.status(404).json({ message: "Fournisseur non trouvé" });
        }

        await supplier.deleteOne();
        res.status(200).json({ message: "Fournisseur supprimé avec succès" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
