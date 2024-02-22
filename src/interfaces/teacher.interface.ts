import { Document } from "mongoose";
import { I_User } from "./user.interface";

export interface I_Teacher extends I_User, Document {
    exp: number,
}