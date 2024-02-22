import { IsIn, IsNotEmpty, IsString } from "class-validator"
import { E_Role } from "src/constants/role.enum"
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
    @IsIn([E_Role.STUDENT, E_Role.TEACHER, E_Role.ADMIN], { message: "just accept 'student', 'teacher' or 'admin' role!" })
    readonly role: string
}