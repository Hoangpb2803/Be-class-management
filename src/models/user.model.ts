import mongoose, { Schema, model } from "mongoose";
import { I_User } from "src/interfaces/user.interface";

export const User_Schema = new Schema<I_User>({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    major: { type: mongoose.Schema.Types.ObjectId, ref: 'Major', required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['student', 'teacher', 'admin'], required: true }
},
    {
        timestamps: true,
        collection: "User"
    }
)

export const User_Model = model<I_User>('User', User_Schema)