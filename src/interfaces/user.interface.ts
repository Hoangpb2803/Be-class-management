import { Document } from "mongoose";

export interface I_User extends Document {
    name: string,
    email: string,
    password: string,
    role: string
}