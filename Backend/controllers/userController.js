import jwt from 'jsonwebtoken'
import bcrypt  from 'bcryptjs'
import { user } from "../models/user.js";

// Fonction pour enregistrer un nouvel utilisateur
export const createUser = async (req, res, next) => {
    try {

        const { firstName, lastName, email, password, role } = req.body;

        // Vérifier existence de l utilisateur dans la base de données avec le  email
        const isExistUser = await user.findOne({
            email: email
        });
        
        // retourner une réponse d'erreur Si l'utilisateur existe
        if (isExistUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hacher le mot de passe avec bcrypt
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Créer un nouvel utilisateur 
        await new user({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: hashedPassword,
            role: role 
        }).save();

        // Confirmer l'ajout de l'utilisateur si ok
        res.status(201).json({ message: "User added" });

    } catch (error) {
        // Gérer les erreurs 
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}


// Fonction pour connecter un utilisateur
export const login = async (req, res) => {
    try {
        
        const { email, password } = req.body;

         // Retourner un msg si user not exist
        const existUser = await user.findOne({ email });

        // Si l'utilisateur n'existe pas, retourner une réponse d'erreur
        if (!existUser) {
            return res.status(400).send('Invalid email.');
        }

        // Comparer le mdp fourni avec le hachedMdp
        const isValidatedPsw = await bcrypt.compare(password, existUser.password);

        //mdp incorrect
        if (!isValidatedPsw) {
            return res.status(400).send('Invalid password.');
        }

        // Générer un token JWT pour la connexion
        const token = jwt.sign({ _id: existUser._id, role: existUser.role }, process.env.JWT_SECRET);
        
        res.json({ token });

    } catch (error) {
        // gerer les erreurs
        console.log(error);
    }
};