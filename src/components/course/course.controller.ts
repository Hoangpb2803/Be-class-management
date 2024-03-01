import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { CourseService } from './course.service';
import { ResponseData } from 'src/constants/response-data';
import { I_Course } from 'src/interfaces/course.interface';
import { CourseDto } from 'src/dtos/course.dto';
import { AuthGuard } from 'src/guards/verify_token.guard';
import { AdminGuard } from 'src/guards/admin.guard';

@UseGuards(AuthGuard, AdminGuard)
@Controller('course')
export class CourseController {
    constructor(
        private readonly courseService: CourseService
    ) { }

    @Get()
    getAllStudents(): Promise<ResponseData<I_Course>> {
        return this.courseService.getAllCourses()
    }

    @Get(":id")
    async getStudentDetail(@Param('id') _id: string): Promise<ResponseData<I_Course>> {
        return this.courseService.getCourseDetail(_id)
    }

    @Post()
    async createNewStudent(@Body() data: CourseDto): Promise<ResponseData<I_Course>> {
        return this.courseService.createNewCourse(data)
    }

    @Put(":id")
    async updateStudentInfo(@Param('id') _id: string, @Body() data: CourseDto): Promise<ResponseData<I_Course>> {
        return this.courseService.updateCourseInfo(_id, data)
    }

    @Delete(":id")
    async deleteStudentInfo(@Param('id') _id: string): Promise<ResponseData<I_Course>> {
        return this.courseService.deleteCourse(_id)
    }
}
