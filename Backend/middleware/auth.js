import jwt from 'jsonwebtoken';
import { user } from '../models/user.js';

const auth = async (req, res, next) => {
    try {
        // Récupérer le token du header
        const token = req.header('Authorization')?.replace('Bearer ', '');
        
        if (!token) {
            return res.status(401).json({ message: "Accès refusé. Veuillez vous connecter." });
        }

        // Vérifier le token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Rechercher l'utilisateur avec l'ID correct qui possède ce token
        const user = await user.findOne({ 
            _id: decoded.userId,
        });

        if (!user) {
            throw new Error();
        }

        // Ajouter l'utilisateur à l'objet request
        req.user = user;
        req.token = token;

        next();
    } catch (error) {
        res.status(401).json({ message: "Accès refusé. Token invalide." });
    }
};

export default auth;
