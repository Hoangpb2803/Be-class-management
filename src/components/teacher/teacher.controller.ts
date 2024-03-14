
import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ResponseData } from 'src/constants/response-data';
import { TeacherService } from './teacher.service';
import { I_Teacher } from 'src/interfaces/teacher.interface';
import { teacherDto } from 'src/dtos/teacher.dto';


@Controller('teacher')
export class TeacherController {
    constructor(
        private readonly teacherService: TeacherService
    ) { }

    @Get()
    async getAllStudents(): Promise<ResponseData<number>> {
        return this.teacherService.getAllTeachers()
    }

    @Get("pagination")
    async getStudentsPagination(
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 1
    ): Promise<ResponseData<I_Teacher>> {
        return this.teacherService.getPagination(page, limit)
    }

    @Get(":id")
    async getStudentDetail(@Param('id') _id: string): Promise<ResponseData<I_Teacher>> {
        return this.teacherService.getTeacherDetail(_id)
    }

    @Post()
    async createNewStudent(@Body() data: teacherDto): Promise<ResponseData<I_Teacher>> {
        return this.teacherService.createNewTeacher(data)
    }

    @Put(":id")
    async updateStudentInfo(@Param('id') _id: string, @Body() data: teacherDto): Promise<ResponseData<I_Teacher>> {
        return this.teacherService.updateTeacherInfo(_id, data)
    }

    @Delete(":id")
    async deleteStudent(@Param('id') _id: string): Promise<ResponseData<I_Teacher>> {
        return this.teacherService.deleteTeacher(_id)
    }
}
