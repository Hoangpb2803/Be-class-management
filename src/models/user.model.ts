import { Schema, model } from "mongoose";
import { I_User } from "src/interfaces/user.interface";

export const User_Schema = new Schema<I_User>({
    name: String,
    email: String,
    password: String,
    role: { type: String, enum: ['student', 'teacher', 'admin'] }
},
    {
        timestamps: true,
        collection: "User"
    }
)

export const User_Model = model<I_User>('User', User_Schema)