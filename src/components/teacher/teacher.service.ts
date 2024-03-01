/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { E_Message } from 'src/constants/message.enum';
import { ResponseData } from 'src/constants/response-data';
import { teacherDto } from 'src/dtos/teacher.dto';
import { I_Teacher } from 'src/interfaces/teacher.interface';
import { BaseRepository } from 'src/repositories/base.repository';
import { UserRepository } from 'src/repositories/user.repository';

@Injectable()
export class TeacherService {
    constructor(
        @InjectModel('Teacher')
        private readonly teacherModel: Model<I_Teacher>,
        private readonly userRepo: UserRepository
    ) { }

    private readonly baseRepo = new BaseRepository<I_Teacher>(this.teacherModel)
    private readonly object = "student"

    async getAllStudents(): Promise<ResponseData<I_Teacher>> {
        return await this.baseRepo.findAll(this.object)
    }

    async getStudentDetail(_id: string): Promise<ResponseData<I_Teacher>> {
        return await this.baseRepo.findOne(_id)
    }

    async checkStudentExist(email: string): Promise<{ exist: boolean, notice?: HttpException }> {
        try {
            const checkExist = await this.teacherModel.findOne({ email })
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

    async createNewStudent(data: teacherDto): Promise<ResponseData<I_Teacher>> {
        const { exp, ...user } = data
        const role = "teacher"

        const checkExist = await this.checkStudentExist(data.email)
        if (checkExist.exist)
            throw checkExist.notice
        try {
            const hashPassword = await this.userRepo.hashPassword("123456")
            const newTeacher = await this.teacherModel.create({ ...data, password: hashPassword, role })
            const newUser = await this.userRepo.createNewUser(newTeacher._id, hashPassword, role, user)
            if (newTeacher && newUser)
                return new ResponseData(HttpStatus.OK, E_Message.CREATE_SUCCESS, newTeacher)
        } catch (error) {
            throw new HttpException("cannot create student", HttpStatus.INTERNAL_SERVER_ERROR)
        }

    }

    async updateStudentInfo(_id: string, data: teacherDto): Promise<ResponseData<I_Teacher>> {
        const { exp, ...user } = data
        const checkExist = this.baseRepo.findOne(_id)
        if (checkExist) {
            try {
                const updateStudent = await this.teacherModel.findByIdAndUpdate(_id, data, { new: true })
                const newUser = await this.userRepo.updateNewUser(user, _id)
                if (updateStudent && newUser) {
                    return new ResponseData(HttpStatus.OK, E_Message.UPDATE_SUCCESS, updateStudent)
                }
            } catch (error) {
                throw new HttpException("Cannot update student!", HttpStatus.INTERNAL_SERVER_ERROR)
            }
        }
    }

    async deleteStudent(_id: string): Promise<ResponseData<I_Teacher>> {
        return await this.baseRepo.delete(_id, this.object)
    }
}
