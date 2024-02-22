import { Schema, model } from "mongoose";
import { I_Teacher } from "src/interfaces/teacher.interface";
import { User_Schema } from "./user.model";

export const Teacher_Schema = new Schema<I_Teacher>({
    ...User_Schema.obj,
    exp: { type: Number, required: true },
}, {
    timestamps: true,
    collection: "Teacher"
})

export const Teacher_Model = model<I_Teacher>("Teacher", Teacher_Schema)