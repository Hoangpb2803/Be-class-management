import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { I_User } from "src/interfaces/user.interface";
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthRepository {
    constructor(
        @InjectModel('User')
        private readonly userModel: Model<I_User>
    ) { }

    async emailExists(email: string): Promise<I_User> {
        try {
            const user = await this.userModel.findOne({ email });
            return user;
        } catch (error) {
            console.error("getting error when check existed email!!!", error)
            throw error
        }
    }

    async compareUserInfo(password: string, hashPassword: string): Promise<boolean> {
        try {
            const checkPassword = await bcrypt.compare(password, hashPassword)
            return checkPassword
        } catch (error) {
            console.error("getting error when compare password!!!", error)
            throw error
        }
    }
}