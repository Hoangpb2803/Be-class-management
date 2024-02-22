import { Schema, model } from "mongoose";
import { I_Student } from "src/interfaces/student.interface";
import { User_Schema } from "./user.model";

export const Student_Schema = new Schema<I_Student>({
    ...User_Schema.obj,
    level: { type: Number, enum: [1, 2, 3, 4], required: true },
}, {
    timestamps: true,
    collection: "Student"
})

export const Student_Model = model<I_Student>("Student", Student_Schema)