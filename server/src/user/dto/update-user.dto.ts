import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    
  
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @Length(3, 25)
    firstName: string;

    @ApiProperty()
    @IsString()
    @Length(3, 25)
    lastName?: string;

    @ApiProperty()
    @IsEmail()
    email?: string;

    @ApiProperty()
    @IsNotEmpty()
    @Length(5, 255)
    phone_number?: number;

}
