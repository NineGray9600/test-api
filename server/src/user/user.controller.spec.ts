import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from './entities/user.entity';

describe('User Controller', () => {
  let controller: UserController;

  beforeEach(async () => {
    

    const users: User[] = [
      {
        userId: 1,
        firstName: 'alpha',
        lastName: 'betta',
        email: 'gamma@test.com',
        phoneNumber: +[12345678].toString(),
        createdAt: new Date('2020-06-01T01:23:34'),
        updatedAt: null,
      },
    ];

    const module: TestingModule = await Test.createTestingModule({
      
      controllers: [UserController],
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            save: (user: User): User => {
              user.push({
                ...user,
                userId: users.length++,
                createdAt: new Date(),
                updatedAt: null,
              } as User);
              return user;
            },
          },
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('gamma@test.com', async () => {
    const dto: CreateUserDto = {
      firstName: 'alpha',
      lastName: 'betta',
      email: 'gamma@test.com',
      phoneNumber: +[12345678].toString(),
    };
    const user = await controller.create(dto);
    expect(user.email).toBe('gamma@test.com');
  });

  it('alpha', async () => {
    const dto: CreateUserDto = {
      firstName: 'alpha',
      lastName: 'betta',
      email: 'gamma@test.com',
      phoneNumber: +[12345678].toString(),
    };
    const user = await controller.create(dto);
    expect(user.firstName).toBe('alpha');
  });

  it('betta', async () => {
    const dto: CreateUserDto = {
      firstName: 'alpha',
      lastName: 'betta',
      email: 'gamma@test.com',
      phoneNumber: +[12345678].toString(),
    };
    const user = await controller.create(dto);
    expect(user.lastName).toBe('betta');
  });

  it('12345678', async () => {
    const dto: CreateUserDto = {
      firstName: 'alpha',
      lastName: 'betta',
      email: 'gamma@test.com',
      phoneNumber: +[12345678].toString()
    };
    const user = await controller.create(dto);
    expect(user.phoneNumber).toBe('12345678');
  });

});
