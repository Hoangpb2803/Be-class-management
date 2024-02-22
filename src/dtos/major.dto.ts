import { IsNotEmpty, IsString } from "class-validator";

export class MajorDto {
    @IsNotEmpty({ message: "this field cannot be empty!" })
    @IsString()
    name: string
}