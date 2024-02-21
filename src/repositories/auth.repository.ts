import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { RegisterDto } from "src/dtos/register.dto";
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

    async hashPassword(pw: string): Promise<string> {
        try {
            const saltRounds = 10
            const salt = await bcrypt.genSalt(saltRounds)
            const hash = await bcrypt.hash(pw, salt)
            return hash
        } catch (error) {
            console.error("getting error when hash password!!!", error)
            throw error;
        }
    }

    async createNewUser(data: RegisterDto): Promise<I_User> {
        try {
            const hashPassword = await this.hashPassword(data.password)
            const newUser = await this.userModel.create({ ...data, password: hashPassword })
            return newUser
        } catch (error) {
            console.error("getting error when add new user!!!", error);
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

    async checkUser(_id: string) {
        return this.userModel.findById(_id).exec()
    }

}