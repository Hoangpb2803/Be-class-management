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

    async getAll(): Promise<ResponseData<I_Teacher>> {
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
                        major: '$majorInfo.name'
                    }
                }
            ])
            if (teachers)
                return new ResponseData(HttpStatus.OK, undefined, teachers)
        } catch (error) {
            console.log(error);
            throw new HttpException(`Cannot get teacher!`, HttpStatus.CONFLICT)
        }

    }
}