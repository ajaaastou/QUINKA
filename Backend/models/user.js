import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema ({

    firstName: { 
        type: String, 
        required: true,
        minLength : [3 , "Enter 3 caracters at least"]
    },

    lastName: { 
        type: String, 
        required: true,
        minLength : [3 , "Enter 3 caracters at least"]
    },

    email: { 
        type: String, 
        required: true,
        validate : [validator.isEmail, "Mail incorrect"]
    },

    password: { 
        type: String,
        required: true ,
        unique : true
    },

    role: { 
        
        type: String, 
        enum: ['user', 'admin'], 
        default: 'user' 
    }
})

export const user = mongoose.model('user', userSchema)