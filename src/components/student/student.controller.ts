import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { StudentDto } from 'src/dtos/student.dto';
import { StudentService } from './student.service';
import { ResponseData } from 'src/constants/response-data';
import { I_Student } from 'src/interfaces/student.interface';
import { TestGuard } from 'src/guards/test.guard';

@Controller('student')
export class StudentController {
    constructor(
        private readonly studentService: StudentService
    ) { }

    @Get()
    async getAllStudents(): Promise<ResponseData<I_Student>> {
        return this.studentService.getAllStudents()
    }

    @Get(":id")
    async getStudentDetail(@Param('id') _id: string): Promise<ResponseData<I_Student>> {
        return this.studentService.getStudentDetail(_id)
    }

    @UseGuards(TestGuard)
    @Post()
    async createNewStudent(@Body() data: StudentDto): Promise<ResponseData<I_Student>> {
        return this.studentService.createNewStudent(data)
    }

    @Put(":id")
    async updateStudentInfo(@Param('id') _id: string, @Body() data: StudentDto): Promise<ResponseData<I_Student>> {
        return this.studentService.updateStudentInfo(_id, data)
    }

    @Delete(":id")
    async deleteStudent(@Param('id') _id: string): Promise<ResponseData<I_Student>> {
        return this.studentService.deleteStudent(_id)
    }
}
