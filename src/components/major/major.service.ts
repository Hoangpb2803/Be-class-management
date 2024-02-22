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

    async getAllMajors(): Promise<ResponseData<I_Major>> {
        try {
            const majors = await this.baseRepo.findAll()
            if (majors)
                return new ResponseData(HttpStatus.OK, undefined, majors)
        } catch (error) {
            throw new HttpException("Cannot get majors!", HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async getMajorDetail(_id: string): Promise<ResponseData<I_Major>> {
        try {
            const major = await this.baseRepo.findOne(_id)
            if (major)
                return new ResponseData(HttpStatus.OK, undefined, major)
        } catch (error) {
            throw new HttpException("Cannot get major!", HttpStatus.INTERNAL_SERVER_ERROR)
        }
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
        try {
            const major = await this.baseRepo.create(data)
            if (major)
                return new ResponseData(HttpStatus.CREATED, E_Message.CREATE_SUCCESS, major)
        } catch (error) {
            throw new HttpException("Cannot create new major!", HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async updateMajorInfo(_id: string, data: MajorDto): Promise<ResponseData<I_Major>> {
        try {
            const checkExist = await this.baseRepo.findOne(_id)
            if (!checkExist)
                throw new HttpException(E_Message.DONOT_EXIST, HttpStatus.CONFLICT)
            const updateMajor = await this.baseRepo.update(_id, data)
            if (updateMajor) {
                return new ResponseData(HttpStatus.OK, E_Message.UPDATE_SUCCESS, updateMajor)
            }
        } catch (error) {
            throw new HttpException("Cannot update major!", HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async deleteMajor(_id: string): Promise<ResponseData<I_Major>> {
        try {
            const checkExist = await this.baseRepo.findOne(_id)
            if (!checkExist)
                throw new HttpException(E_Message.DONOT_EXIST, HttpStatus.CONFLICT)
            const deleteMajor = await this.baseRepo.delete(_id)
            if (deleteMajor) {
                return new ResponseData(HttpStatus.OK, E_Message.DELETE_SUCCESS)
            }
        } catch (error) {
            throw new HttpException("Cannot delete major!", HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}
