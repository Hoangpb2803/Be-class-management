import { IsIn, IsMongoId, IsNotEmpty, IsNumber, IsString } from "class-validator"
import { Types } from "mongoose"
import { Role } from "src/constants/type"
import { IsFptEmail } from "src/decorators/validation.decorator"

export class UserDto {
    @IsNotEmpty()
    @IsString()
    readonly name: string

    @IsNotEmpty()
    @IsNumber()
    age: number

    @IsMongoId()
    major: Types.ObjectId

    @IsNotEmpty()
    @IsString()
    @IsFptEmail({ message: "email must have '@fpt.edu.vn' in suffix" })
    readonly email: string

    @IsNotEmpty()
    @IsString()
    readonly password: string

    @IsIn(['student', 'teacher', 'admin'], { message: 'just accept role "student", "teacher" or "admin"' })
    readonly role: Role
}