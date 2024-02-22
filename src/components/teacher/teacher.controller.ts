
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
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
    async getAllStudents(): Promise<ResponseData<I_Teacher>> {
        return this.teacherService.getAllStudents()
    }

    @Get(":id")
    async getStudentDetail(@Param('id') _id: string): Promise<ResponseData<I_Teacher>> {
        return this.teacherService.getStudentDetail(_id)
    }

    @Post()
    async createNewStudent(@Body() data: teacherDto): Promise<ResponseData<I_Teacher>> {
        return this.teacherService.createNewStudent(data)
    }

    @Put(":id")
    async updateStudentInfo(@Param('id') _id: string, @Body() data: teacherDto): Promise<ResponseData<I_Teacher>> {
        return this.teacherService.updateStudentInfo(_id, data)
    }

    @Delete(":id")
    async deleteStudent(@Param('id') _id: string): Promise<ResponseData<I_Teacher>> {
        return this.teacherService.deleteStudent(_id)
    }
}
