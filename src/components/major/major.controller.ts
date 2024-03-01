import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { MajorService } from './major.service';
import { ResponseData } from 'src/constants/response-data';
import { I_Major } from 'src/interfaces/major.interface';
import { MajorDto } from 'src/dtos/major.dto';
// import { AuthGuard } from 'src/guards/verify_token.guard';
// import { AdminGuard } from 'src/guards/admin.guard';

// @UseGuards(AuthGuard, AdminGuard)
@Controller('major')
export class MajorController {

    constructor(
        private readonly majorService: MajorService
    ) { }

    @Get()
    getAllStudents(): Promise<ResponseData<I_Major>> {
        return this.majorService.getAllMajors()
    }

    @Get(":id")
    async getStudentDetail(@Param('id') _id: string): Promise<ResponseData<I_Major>> {
        return this.majorService.getMajorDetail(_id)
    }

    @Post()
    async createNewStudent(@Body() data: MajorDto): Promise<ResponseData<I_Major>> {
        return this.majorService.createNewMajor(data)
    }

    @Put(":id")
    async updateStudentInfo(@Param('id') _id: string, @Body() data: MajorDto): Promise<ResponseData<I_Major>> {
        return this.majorService.updateMajorInfo(_id, data)
    }

    @Delete(":id")
    async deleteStudentInfo(@Param('id') _id: string): Promise<ResponseData<I_Major>> {
        return this.majorService.deleteMajor(_id)
    }
}
