import { IsIn, IsNotEmpty, IsString } from "class-validator"
import { IsFptEmail } from "src/decorators/validation.decorator"

export class RegisterDto {
    @IsNotEmpty()
    @IsString()
    @IsFptEmail({ message: "email must have '@fpt.edu.vn' in suffix!" })
    readonly email: string

    @IsNotEmpty()
    @IsString()
    readonly password: string

    @IsNotEmpty()
    @IsString()
    readonly name: string

    @IsNotEmpty()
    @IsString()
    @IsIn(['student', 'teacher', 'admin'], { message: "just accept 'student', 'teacher' or 'admin' role!" })
    readonly role: string
}