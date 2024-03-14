import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ResponseData } from "src/constants/response-data";
import { I_Teacher } from "src/interfaces/teacher.interface";

@Injectable()
export class TeacherRepository {
    constructor(
        @InjectModel('Teacher')
        private readonly teacherModel: Model<I_Teacher>
    ) { }

    async getNumberTeachers(): Promise<ResponseData<number>> {
        try {
            const numberTeachers = await this.teacherModel.countDocuments()
            if (numberTeachers)
                return new ResponseData(HttpStatus.OK, undefined, numberTeachers)
        } catch (error) {
            console.log(error);
            throw new HttpException(`Cannot get teacher!`, HttpStatus.CONFLICT)
        }

    }

    async pagination(page: number, limit: number, object: string): Promise<ResponseData<I_Teacher>> {
        try {
            const teachers = await this.teacherModel.aggregate([
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
                        exp: 1,
                        email: 1,
                        major: {
                            _id: "$majorInfo._id",
                            name: "$majorInfo.name",
                        }
                    }
                },
                { $skip: (page - 1) * limit },
                { $limit: Number(limit) }
            ])
            if (teachers)
                return new ResponseData(HttpStatus.OK, undefined, teachers)
        } catch (error) {
            console.log(error);

            throw new HttpException(`Cannot get ${object}!`, HttpStatus.CONFLICT)
        }
    }
}