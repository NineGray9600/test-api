import { BadGatewayException, BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AnyTxtRecord } from 'dns';
import { retry } from 'rxjs';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>){}


  async create(createUserDto: CreateUserDto) : Promise<User> {
    const userExists = await this.userRepo.findOne({phone_number: createUserDto.phone_number})
    if(userExists) {
      throw new BadRequestException(`User with this number is already exists`)
    }
    const newUser = new User();
    newUser.firstName = createUserDto.firstName;
    newUser.lastName = createUserDto.lastName;
    newUser.email = createUserDto.email;
    newUser.phone_number = createUserDto.phone_number;
    newUser.createdAt = new Date();
    newUser.updatedAt = newUser.createdAt;
    return await this.userRepo.save(newUser);
  }

  async findAll() : Promise<User[]> {
    return await this.userRepo.createQueryBuilder('user').getMany()
  }

  async findById(id: number | string) : Promise<User> {
    const finded = await this.userRepo.findOne(id)
    if(!finded) {
      throw new BadGatewayException('User is not found')
    }
    return await this.userRepo.findOne(id);
  }

  async findByPhoneNumber(phone_number: number, userId: string | number) : Promise<any> {
    const users: Array<User> = await this.userRepo.createQueryBuilder()
                                    .select(['userId','phoneNumber'])
                                    .where('userId = :userId',{userId})
                                    .orWhere('phone_number = :phone_number',{phone_number})
                                    .limit(1)
                                    .execute();
    if(users && users.length) {
      return users[0];
    }
    return await this.userRepo.createQueryBuilder('users').getMany();
  }

  async update(userId: number | string, phone: number ,updateUserDto: UpdateUserDto,) : Promise<User> {
    const { firstName, lastName, email, phone_number} = updateUserDto;
    const userById = await this.userRepo.findOne(userId);
    const userByNumber = await this.userRepo.findOne({where: {phone_number: phone}})
    if(!userById && !userByNumber) { throw new BadRequestException() };
    firstName ? userById.firstName = firstName : [];
    lastName ? userById.lastName = lastName : [];
    email ? userById.email = email : [];
    phone_number ? userById.phone_number = phone_number : [];
    return await this.userRepo.save(userById);
  }

  async delete(id: number | string) {
    const userById = await this.userRepo.findOne(id)
     return userById ? await this.userRepo.delete(id) : 'Something goes wrong'
  }
}
