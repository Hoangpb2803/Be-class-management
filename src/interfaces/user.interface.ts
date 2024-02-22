import { Document, Types } from "mongoose";
import { Role } from "src/constants/type";

export interface I_User extends Document {
    name: string,
    age: number,
    major: Types.ObjectId,
    email: string,
    password: string,
    role: Role
}