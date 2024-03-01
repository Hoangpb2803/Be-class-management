import { IsDateString, IsMongoId, IsNotEmpty, IsString } from "class-validator"
import { Types } from "mongoose"
import { IsFptEmail } from "src/decorators/validation.decorator"

export class UserDto {
    @IsNotEmpty()
    @IsString()
    readonly name: string

    @IsNotEmpty()
    @IsDateString()
    dateOfBirth: Date

    @IsMongoId()
    major: Types.ObjectId

    @IsNotEmpty()
    @IsString()
    @IsFptEmail({ message: "email must have '@fpt.edu.vn' in suffix" })
    readonly email: string
}