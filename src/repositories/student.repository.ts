import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ResponseData } from "src/constants/response-data";
import { StudentDto } from "src/dtos/student.dto";
import { I_Student } from "src/interfaces/student.interface";

@Injectable()
export class StudentRepository {
    constructor(
        @InjectModel('Student')
        private readonly studentModel: Model<I_Student>
    ) { }

    async getNumberStudents(): Promise<ResponseData<number>> {
        try {
            const numberStudents = await this.studentModel.countDocuments()
            if (numberStudents)
                return new ResponseData(HttpStatus.OK, undefined, numberStudents)
        } catch (error) {
            console.log(error);
            throw new HttpException(`Cannot get student!`, HttpStatus.CONFLICT)
        }

    }

    async pagination(page: number, object: string): Promise<ResponseData<I_Student>> {
        try {
            const students = await this.studentModel.aggregate([
                {
                    $lookup: {
                        from: 'Major',
                        localField: 'major',
                        foreignField: '_id',
                        as: 'majorInfo'
                    }
                },
                {
                    $unwind: "$majorInfo"
                },
                {
                    $project: {
                        _id: 1,
                        name: 1,
                        dateOfBirth: 1,
                        level: 1,
                        email: 1,
                        major: {
                            _id: "$majorInfo._id",
                            name: "$majorInfo.name",
                        }
                    }
                },
                { $skip: (page - 1) * 5 },
                { $limit: 5 }
            ])
            if (students)
                return new ResponseData(HttpStatus.OK, undefined, students)
        } catch (error) {
            console.log(error);

            throw new HttpException(`Cannot get ${object}!`, HttpStatus.CONFLICT)
        }
    }

    async createStudent(data: Partial<I_Student>): Promise<I_Student> {
        return (await this.studentModel.create(data)).populate('major', '_id name');
    }

    async updateStudent(_id: string, data: StudentDto): Promise<I_Student> {
        return await this.studentModel.findOneAndUpdate(
            { _id },
            { $set: { ...data } },
            {
                new: true,
            }
        ).populate('major', '_id name').exec()
    }

}