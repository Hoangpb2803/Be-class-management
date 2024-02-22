import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { I_User } from "src/interfaces/user.interface";
import { UserDto } from "src/dtos/user.dto";

@Injectable()
export class UserRepository {
    constructor(
        @InjectModel('User')
        private readonly userModel: Model<I_User>
    ) { }

    async createNewUser(user: UserDto, _id: Types.ObjectId): Promise<I_User> {
        return this.userModel.create({
            _id,
            ...user
        })
    }

    async updateNewUser(user: UserDto, _id: string): Promise<I_User> {
        return await this.userModel.findByIdAndUpdate(_id, user, { new: true })
    }
}