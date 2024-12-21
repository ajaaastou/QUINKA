import { Products } from "../models/product.js";


export const createProduct = async (req, res, next) => {

    try {
        const produit = new Products({
            name: req.body.name,
            price: req.body.price,
            quantity: req.body.quantity,
            description: req.body.description,  
            supplier: req.body.supplier,
            category: req.body.category,
        });

        await produit.save();

        res.status(201).json({
            message: "Nouveau produit ajouté avec succès!",
        });

    } catch (err) {
        res.status(400).json({
            error: err
        });
    }
};


export const getAllProducts = async (req, res, next) => {

    try {
        const products = await Products.find()
            .populate('category')
            .populate('supplier')
            .exec();
        res.status(200).json(products);

    } catch (err) {
        res.status(400).json({
            error: err,
        });
    }
};


export const getOneProduct = async (req, res, next) => {

    try {
        const product = await Products.findOne({ _id: req.params.id })
            .populate('category')
            .populate('supplier')
            .exec();
        if (!product) {
            return res.status(404).json({ error: "Produit non trouvé." });
        }
        res.status(200).json(product);

    } catch (err) {
        res.status(400).json({
            error: err,
        });
    }
};


export const updateOneProduct = async (req, res, next) => {

    try {
        const result = await Products.updateOne(
            { _id: req.params.id },
            { $set: {
                name: req.body.name,
                price: req.body.price,
                quantity: req.body.quantity,
                description: req.body.description,  
                supplier: req.body.supplier,
                category: req.body.category,
            }},
        );

        if (result.modifiedCount === 0) {
            return res.status(404).json({ error: "Produit non trouvé ou aucune modification effectuée." });
        }
        res.status(200).json({
            message: `Produit ${req.params.id} mis à jour avec succès!`,
        });

    } catch (err) {
        res.status(400).json({
            error: err,
        });
    }
};


export const deleteOneProduct = async (req, res, next) => {
    try {
        const result = await Products.deleteOne({ _id: req.params.id });
        if (result.deletedCount === 0) {
            return res.status(404).json({ error: "Produit non trouvé." });
        }
        res.status(200).json({
            message: `Produit ${req.params.id} supprimé avec succès!`,
        });
    } catch (err) {
        res.status(400).json({
            error: err,
        });
    }
};