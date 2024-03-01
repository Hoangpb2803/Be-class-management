import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { E_Message } from 'src/constants/message.enum';
import { ResponseData } from 'src/constants/response-data';
import { CourseDto } from 'src/dtos/course.dto';
import { I_Course } from 'src/interfaces/course.interface';
import { BaseRepository } from 'src/repositories/base.repository';

@Injectable()
export class CourseService {
    constructor(
        @InjectModel('Course')
        private readonly courseModel: Model<I_Course>
    ) { }

    private readonly baseRepo = new BaseRepository<I_Course>(this.courseModel)
    private readonly object = "course"

    async getAllCourses(): Promise<ResponseData<I_Course>> {
        return await this.baseRepo.findAll(this.object)
    }

    async getCourseDetail(_id: string): Promise<ResponseData<I_Course>> {
        return await this.baseRepo.findOne(_id)
    }

    async checkCourseExist(name: string): Promise<{ exist: boolean, notice?: HttpException }> {
        try {
            const checkExist = await this.courseModel.findOne({ name })
            if (checkExist) {
                return {
                    exist: true,
                    notice: new HttpException(E_Message.EXIST, HttpStatus.CONFLICT)
                }
            }
            return { exist: false }
        } catch (error) {
            throw new HttpException("cannot find Course", HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async createNewCourse(data: CourseDto): Promise<ResponseData<I_Course>> {
        const checkExist = await this.checkCourseExist(data.name)
        if (checkExist.exist)
            throw checkExist.notice
        return await this.baseRepo.create(data, this.object)
    }

    async updateCourseInfo(_id: string, data: CourseDto): Promise<ResponseData<I_Course>> {
        return await this.baseRepo.update(_id, data, this.object)
    }

    async deleteCourse(_id: string): Promise<ResponseData<I_Course>> {
        return await this.baseRepo.delete(_id, this.object)
    }
}
