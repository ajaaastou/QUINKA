import { Category } from "../models/category.js"

// Créer une nouvelle catégorie
export const createCategory = async (req, res) => {
    try {
        const category = new Category (req.body);
        await category.save();

        res.status(201).json({message: "Catégorie créée avec succès!"});


    } catch (error) {

        res.status(500).send('Erreur serveur.');
    }
};

// Obtenir toutes les catégories
export const getAllCategories = (req, res, next) =>{
    const allcategories = Category.find()
    allcategories.then(
        (categories) => res.status(200).json(categories)
    )
    .catch(
        (err) => res.status(400).json({
            error: err
        })
    )
}


export const getOneCategory = (req, res, next) =>{
    const onecategory = Category.findOne({
        _id: req.params.id
    })
    onecategory.then(
        (thecategory) => res.status(200).json(thecategory)
    ).catch(
        (err) => res.status(400).json({
            error: err
        })
    )
}

export const updateOneCategory = (req, res, next) =>{
    const onecategory = Category.updateOne({
        _id: req.params.id,
        name: req.body.name
    });

    onecategory.then(() => res.status(200).json({
        message: "Catégorie mise à jour avec succès!"
    })).catch(
        (err) => res.status(400).json({error: err})
    )
}

export const deleteOneCategory = (req, res, next) =>{
    Category.deleteOne({
        _id: req.params.id
    }).then(() => res.status(200).json({message: "Catégorie supprimée avec succès!"}))
    .catch(
        (err) => res.status(400).json({error: err})
    )
}