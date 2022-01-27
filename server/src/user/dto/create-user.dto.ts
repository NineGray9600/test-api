import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";



export class CreateUserDto {

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @Length(2, 55)
    firstName: string;

    @ApiProperty()
    @IsString()
    @Length(3, 25)
    lastName?: string;

    @ApiProperty()
    @IsEmail(undefined, {message: 'Invalid email'})
    email?: string;

    @ApiProperty()
    @IsNotEmpty()
    @Length(2, 255)
    phone_number?: number;
}
