import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { E_Message } from 'src/constants/message.enum';
import { ResponseData } from 'src/constants/response-data';
import { MajorDto } from 'src/dtos/major.dto';
import { I_Major } from 'src/interfaces/major.interface';
import { BaseRepository } from 'src/repositories/base.repository';

@Injectable()
export class MajorService {
    constructor(
        @InjectModel('Major')
        private readonly majorModel: Model<I_Major>
    ) { }

    private readonly baseRepo = new BaseRepository<I_Major>(this.majorModel)
    private readonly object = "major"

    async getAllMajors(): Promise<ResponseData<I_Major>> {
        return await this.baseRepo.findAll(this.object)
    }

    async getMajorDetail(_id: string): Promise<ResponseData<I_Major>> {
        return await this.baseRepo.findOne(_id)
    }

    async checkMajorExist(name: string): Promise<{ exist: boolean, notice?: HttpException }> {
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
            throw new HttpException("cannot find major", HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async createNewMajor(data: MajorDto): Promise<ResponseData<I_Major>> {
        const checkExist = await this.checkMajorExist(data.name)
        if (checkExist.exist)
            throw checkExist.notice
        return await this.baseRepo.create(data, this.object)
    }

    async updateMajorInfo(_id: string, data: MajorDto): Promise<ResponseData<I_Major>> {
        return await this.baseRepo.update(_id, data, this.object)
    }

    async deleteMajor(_id: string): Promise<ResponseData<I_Major>> {
        return await this.baseRepo.delete(_id, this.object)
    }
}
