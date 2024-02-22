import { IsIn, IsNotEmpty, IsNumber } from "class-validator";
import { UserDto } from "./user.dto";
import { Level } from "src/constants/type";

export class StudentDto extends UserDto {
    @IsNotEmpty()
    @IsNumber()
    @IsIn([1, 2, 3, 4], { message: "just accept level 1, 2, 3 or 4" })
    level: Level
}