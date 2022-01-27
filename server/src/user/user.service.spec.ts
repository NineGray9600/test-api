import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {

    const users: User[] = [
      {
        userId: 1,
        firstName: 'alpha',
        lastName: 'betta',
        email: 'gamma@test.com',
        phoneNumber: +[1234567].toString(),
        createdAt: new Date('2021-06-07T01:23:34'),
        updatedAt: null,

      },
    ];

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            find: ({
              where: { email },
            }: {
              where: { email: string };
            }) => {
              return users.filter(user => user.email === email);
            },
            save: (user: User): User => {
              users.push({
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

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('alpha', async () => {
    const user = await service.findById('alpha');
    expect(user.phoneNumber).toBe('alpha');
  });
});
