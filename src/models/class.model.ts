import mongoose, { Schema, model } from "mongoose";
import { I_Class } from "src/interfaces/class.interface";

export const Class_Schema = new Schema<I_Class>({
    name: { type: String, required: true },
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student', default: [], required: true }],
    teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher', required: true },
}, {
    timestamps: true,
    collection: "Class"
})

export const Class_Model = model<I_Class>("Class", Class_Schema)