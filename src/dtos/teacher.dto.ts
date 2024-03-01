import { IsNotEmpty, IsNumber } from "class-validator";
import { UserDto } from "./user.dto";

export class teacherDto extends UserDto {
    @IsNotEmpty()
    @IsNumber()
    exp: number
}