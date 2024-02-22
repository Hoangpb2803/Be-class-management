import { IsEmpty, IsNumber } from "class-validator";
import { UserDto } from "./user.dto";

export class teacherDto extends UserDto {
    @IsEmpty()
    @IsNumber()
    exp: number
}