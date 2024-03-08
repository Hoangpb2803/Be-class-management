import { HttpException, HttpStatus } from "@nestjs/common";
import { Document, Model } from "mongoose";
import { E_Message } from "src/constants/message.enum";
import { ResponseData } from "src/constants/response-data";

export class BaseRepository<T extends Document> {
    constructor(
        private model: Model<T>
    ) { }

    async findAll(object: string): Promise<ResponseData<T>> {
        try {
            const objects = await this.model.find()
            if (objects)
                return new ResponseData(HttpStatus.OK, undefined, objects)
            throw new HttpException(`Cannot get ${object}!`, HttpStatus.CONFLICT)
        } catch (error) {
            throw new HttpException(`Cannot get ${object}!`, HttpStatus.CONFLICT)
        }
    }

    async findOne(_id: string): Promise<ResponseData<T>> {
        try {
            const object = await this.model.findById(_id)
            if (object) {
                return new ResponseData(HttpStatus.OK, undefined, object)
            }
            throw new HttpException(E_Message.DONOT_EXIST, HttpStatus.CONFLICT)
        } catch (error) {
            throw new HttpException(E_Message.DONOT_EXIST, HttpStatus.CONFLICT)
        }
    }

    async create(data: Partial<T>, object: string): Promise<ResponseData<T>> {
        try {
            const object = await this.model.create(data)
            if (object)
                return new ResponseData(HttpStatus.CREATED, E_Message.CREATE_SUCCESS, object)
            throw new HttpException(`Cannot create new ${object}!`, HttpStatus.INTERNAL_SERVER_ERROR)
        } catch (error) {
            throw new HttpException(`Cannot create new ${object}!`, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async update(_id: string, data: Partial<T>, object: string): Promise<ResponseData<T>> {
        const checkExist = await this.findOne(_id)
        if (checkExist) {
            try {
                const updateObject = await this.model.findByIdAndUpdate(_id, data, { new: true })
                if (updateObject)
                    return new ResponseData(HttpStatus.OK, E_Message.UPDATE_SUCCESS, updateObject)
                throw new HttpException(`Cannot update ${object}!`, HttpStatus.INTERNAL_SERVER_ERROR)
            } catch (error) {
                throw new HttpException(`Cannot update ${object}!`, HttpStatus.INTERNAL_SERVER_ERROR)
            }
        }
    }

    async delete(_id: string, object: string): Promise<ResponseData<T>> {
        const checkExist = await this.findOne(_id)
        if (checkExist) {
            try {
                const deleteObject = await this.model.findByIdAndDelete(_id)
                if (deleteObject)
                    return new ResponseData(HttpStatus.OK, E_Message.DELETE_SUCCESS)
                throw new HttpException(`Cannot delete ${object}!`, HttpStatus.INTERNAL_SERVER_ERROR)
            } catch (error) {
                throw new HttpException(`Cannot delete ${object}!`, HttpStatus.INTERNAL_SERVER_ERROR)
            }
        }
    }
}