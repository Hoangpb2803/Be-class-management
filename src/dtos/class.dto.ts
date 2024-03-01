import { IsMongoId, IsNotEmpty, IsString } from "class-validator"
import { Types } from "mongoose"

export class ClassDto {
    @IsNotEmpty()
    @IsString()
    readonly name: string

    @IsMongoId()
    course: Types.ObjectId

    @IsMongoId()
    teacher: Types.ObjectId

}