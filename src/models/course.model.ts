import mongoose, { Schema, model } from "mongoose";
import { I_Course } from "src/interfaces/course.interface";

export const Course_Schema = new Schema<I_Course>({
    name: { type: String, required: true },
    major: { type: mongoose.Schema.Types.ObjectId, ref: "Major", required: true }
}, {
    timestamps: true,
    collection: "Course"
})

export const Course_Model = model<I_Course>("Course", Course_Schema)