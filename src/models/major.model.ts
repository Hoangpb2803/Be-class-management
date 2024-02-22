import { Schema, model } from "mongoose";
import { I_Major } from "src/interfaces/major.interface";

export const Major_Schema = new Schema<I_Major>({
    name: { type: String, required: true }
}, {
    timestamps: true,
    collection: 'Major'
})

export const Major_Model = model<I_Major>('Major', Major_Schema)