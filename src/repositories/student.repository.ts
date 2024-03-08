import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ResponseData } from "src/constants/response-data";
import { I_Student } from "src/interfaces/student.interface";

@Injectable()
export class StudentRepository {
    constructor(
        @InjectModel('Student')
        private readonly studentModel: Model<I_Student>
    ) { }

    async getAll(): Promise<ResponseData<I_Student>> {
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
                        major: '$majorInfo.name'
                    }
                }
            ])
            if (students)
                return new ResponseData(HttpStatus.OK, undefined, students)
        } catch (error) {
            console.log(error);

            throw new HttpException(`Cannot get student!`, HttpStatus.CONFLICT)
        }

    }
}