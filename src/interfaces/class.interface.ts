import { Document, Types } from "mongoose";

export interface I_Class extends Document {
    name: string,
    course: Types.ObjectId,
    students: Types.ObjectId[],
    teacher: Types.ObjectId,
}