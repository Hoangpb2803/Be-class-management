import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { I_User } from "src/interfaces/user.interface";
import { UserDto } from "src/dtos/user.dto";
import * as bcrypt from 'bcrypt'

@Injectable()
export class UserRepository {
    constructor(
        @InjectModel('User')
        private readonly userModel: Model<I_User>
    ) { }

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

    async createNewUser(_id: Types.ObjectId, hashPassword: string, role: string, user: UserDto,): Promise<I_User> {
        return this.userModel.create({
            _id,
            password: hashPassword,
            role,
            ...user
        })
    }

    async updateNewUser(user: UserDto, _id: string): Promise<I_User> {
        return await this.userModel.findByIdAndUpdate(_id, user, { new: true })
    }
}