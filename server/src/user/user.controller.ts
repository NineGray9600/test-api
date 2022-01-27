import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOperation, ApiProperty } from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { query } from 'express';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Create User' })
  @Post('')
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createUserDto: CreateUserDto) : Promise<User>{
    return this.userService.create(createUserDto);
  }

  @ApiOperation({ summary: 'Get All Users' })
  @Get('')
  @HttpCode(HttpStatus.OK)
  async findAll() : Promise<User[]> {
    return this.userService.findAll();
  }

  @ApiOperation({ summary: 'Find By Phone Number' })
  @Get('')
  @HttpCode(HttpStatus.ACCEPTED)
  async findByPhoneNumber(@Query('phoneNumber') phoneNumber: number,@Query('userId') userId: number | string) : Promise<any> {
    return await this.userService.findByPhoneNumber(phoneNumber,userId);
  }

  @ApiOperation({ summary: 'Find User By ID' })
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: string | number) : Promise<User> {
    return this.userService.findById(+id);
  }

  @ApiOperation({ summary: 'Update User By ID'})
  @Patch(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  async update(@Query('id') id: string,@Query('phoneNumber') phoneNumber : number ,@Body() updateUserDto: UpdateUserDto) : Promise<User> {
    return this.userService.update(+id, phoneNumber,updateUserDto);
  }

  @ApiOperation({ summary: 'Delete User' })
  @Delete(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  async delete(@Query('id') id: string) {
    return this.userService.delete(+id);
  }
}
