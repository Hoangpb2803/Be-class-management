import { IsNotEmpty, IsString } from "class-validator"
import { IsFptEmail } from "src/decorators/validation.decorator"

export class LoginDto {
    @IsNotEmpty()
    @IsString()
    @IsFptEmail({ message: "email must have '@fpt.edu.vn' in suffix" })
    readonly email: string

    @IsNotEmpty()
    @IsString()
    readonly password: string
}