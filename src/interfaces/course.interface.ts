import { Document, Types } from "mongoose"

export interface I_Course extends Document {
    name: string,
    major: Types.ObjectId
}