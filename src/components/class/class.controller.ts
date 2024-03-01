import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ClassService } from './class.service';
import { ResponseData } from 'src/constants/response-data';
import { I_Class } from 'src/interfaces/class.interface';
import { ClassDto } from 'src/dtos/class.dto';

@Controller('class')
export class ClassController {
    constructor(
        private readonly classService: ClassService
    ) { }

    @Get()
    getAllStudents(): Promise<ResponseData<I_Class>> {
        return this.classService.getAllClass()
    }

    @Get(":id")
    async getStudentDetail(@Param('id') _id: string): Promise<ResponseData<I_Class>> {
        return this.classService.getClassDetail(_id)
    }

    @Post()
    async createNewStudent(@Body() data: ClassDto): Promise<ResponseData<I_Class>> {
        return this.classService.createNewClass(data)
    }

    @Put(":id")
    async updateStudentInfo(@Param('id') _id: string, @Body() data: ClassDto): Promise<ResponseData<I_Class>> {
        return this.classService.updateClassInfo(_id, data)
    }

    @Delete(":id")
    async deleteStudentInfo(@Param('id') _id: string): Promise<ResponseData<I_Class>> {
        return this.classService.deleteClass(_id)
    }
}
