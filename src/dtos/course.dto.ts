import { IsMongoId, IsNotEmpty, IsString } from "class-validator";
import { Types } from "mongoose";

export class CourseDto {
    @IsNotEmpty({ message: "this field cannot be empty!" })
    @IsString()
    name: string

    @IsMongoId()
    @IsNotEmpty()
    major: Types.ObjectId
}