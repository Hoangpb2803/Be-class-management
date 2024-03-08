import { IsIn, IsNotEmpty, IsString } from "class-validator";
import { UserDto } from "./user.dto";
import { Level } from "src/constants/type";

export class StudentDto extends UserDto {
    @IsNotEmpty()
    @IsString()
    @IsIn(["First Year", "Second Year", "Third Year", "Final Year"])
    level: Level


}