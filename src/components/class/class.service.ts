import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { E_Message } from 'src/constants/message.enum';
import { ResponseData } from 'src/constants/response-data';
import { ClassDto } from 'src/dtos/class.dto';
import { I_Class } from 'src/interfaces/class.interface';
import { BaseRepository } from 'src/repositories/base.repository';

@Injectable()
export class ClassService {
    constructor(
        @InjectModel('Class')
        private readonly majorModel: Model<I_Class>
    ) { }

    private readonly baseRepo = new BaseRepository<I_Class>(this.majorModel)
    private readonly object = "class"

    async getAllClass(): Promise<ResponseData<I_Class>> {
        return await this.baseRepo.findAll(this.object)
    }

    async getClassDetail(_id: string): Promise<ResponseData<I_Class>> {
        return await this.baseRepo.findOne(_id)
    }

    async checkClassExist(name: string): Promise<{ exist: boolean, notice?: HttpException }> {
        try {
            const checkExist = await this.majorModel.findOne({ name })
            if (checkExist) {
                return {
                    exist: true,
                    notice: new HttpException(E_Message.EXIST, HttpStatus.CONFLICT)
                }
            }
            return { exist: false }
        } catch (error) {
            throw new HttpException("cannot find class", HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async createNewClass(data: ClassDto): Promise<ResponseData<I_Class>> {
        const checkExist = await this.checkClassExist(data.name)
        if (checkExist.exist)
            throw checkExist.notice
        return await this.baseRepo.create(data, this.object)
    }

    async updateClassInfo(_id: string, data: ClassDto): Promise<ResponseData<I_Class>> {
        return await this.baseRepo.update(_id, data, this.object)
    }

    async deleteClass(_id: string): Promise<ResponseData<I_Class>> {
        return await this.baseRepo.delete(_id, this.object)
    }
}
