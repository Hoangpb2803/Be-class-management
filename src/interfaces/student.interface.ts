import { Document } from "mongoose";
import { I_User } from "./user.interface";
import { Level } from "src/constants/type";

export interface I_Student extends I_User, Document {
    level: Level,
}