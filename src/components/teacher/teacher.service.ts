/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { E_Message } from 'src/constants/message.enum';
import { ResponseData } from 'src/constants/response-data';
import { teacherDto } from 'src/dtos/teacher.dto';
import { I_Teacher } from 'src/interfaces/teacher.interface';
import { I_User } from 'src/interfaces/user.interface';
import { BaseRepository } from 'src/repositories/base.repository';
import { TeacherRepository } from 'src/repositories/teacher.repository';
import { UserRepository } from 'src/repositories/user.repository';

@Injectable()
export class TeacherService {
    constructor(
        @InjectModel('Teacher')
        private readonly teacherModel: Model<I_Teacher>,
        @InjectModel('User')
        private readonly userModel: Model<I_User>,
        private readonly userRepo: UserRepository,
        private readonly teacherRepo: TeacherRepository
    ) { }

    private readonly baseRepo = new BaseRepository<I_Teacher>(this.teacherModel)
    private readonly object = "teacher"

    async getAllTeachers(): Promise<ResponseData<number>> {
        return await this.teacherRepo.getNumberTeachers()
    }

    async getPagination(page: number, limit: number): Promise<ResponseData<I_Teacher>> {
        return await this.teacherRepo.pagination(page, limit, this.object)
    }

    async getTeacherDetail(_id: string): Promise<ResponseData<I_Teacher>> {
        return await this.baseRepo.findOne(_id)
    }

    async checkTeacherExist(email: string): Promise<{ exist: boolean, notice?: HttpException }> {
        try {
            const checkExist = await this.userModel.findOne({ email })
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

    async createNewTeacher(data: teacherDto): Promise<ResponseData<I_Teacher>> {
        const { exp, ...user } = data
        const role = "teacher"

        const checkExist = await this.checkTeacherExist(data.email)
        if (checkExist.exist)
            throw checkExist.notice
        try {
            const hashPassword = await this.userRepo.hashPassword("123456")
            const newTeacher = await this.teacherModel.create({ ...data, password: hashPassword, role })
            const newUser = await this.userRepo.createNewUser(newTeacher._id, hashPassword, role, user)
            if (newTeacher && newUser)
                return new ResponseData(HttpStatus.OK, E_Message.CREATE_SUCCESS, newTeacher)
        } catch (error) {
            throw new HttpException("cannot create Teacher", HttpStatus.INTERNAL_SERVER_ERROR)
        }

    }

    async updateTeacherInfo(_id: string, data: teacherDto): Promise<ResponseData<I_Teacher>> {
        const { exp, ...user } = data
        const checkExist = this.baseRepo.findOne(_id)
        if (checkExist) {
            try {
                const updateTeacher = await this.teacherModel.findByIdAndUpdate(_id, data, { new: true })
                const newUser = await this.userRepo.updateNewUser(user, _id)
                if (updateTeacher && newUser) {
                    return new ResponseData(HttpStatus.OK, E_Message.UPDATE_SUCCESS, updateTeacher)
                }
            } catch (error) {
                throw new HttpException("Cannot update Teacher!", HttpStatus.INTERNAL_SERVER_ERROR)
            }
        }
    }

    async deleteTeacher(_id: string): Promise<ResponseData<I_Teacher>> {
        return await this.baseRepo.delete(_id, this.object)
    }
}
