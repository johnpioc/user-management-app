import { BadRequestException, Injectable } from '@nestjs/common';

import { DatabaseService } from 'src/database/database.service';

import { CreateUserDto, UpdateUserDto, FilterUserDto } from '@/dto/requests';
import { Status } from 'src/constants';

const getStatus = (statusString: string): Status | undefined => {
  switch (statusString) {
    case 'ACTIVE':
      return 'ACTIVE';
    case 'INACIVE':
      return 'INACTIVE';
    case 'SUSPENDED':
      return 'SUSPENDED';
    default:
      return undefined;
  }
};
@Injectable()
export class UserService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createUserDto: CreateUserDto) {
    const isEmailExist = await this.databaseService.user.findUnique({
      where: {
        email: createUserDto.email,
      },
      select: {
        id: true,
      },
    });

    if (isEmailExist) {
      throw new BadRequestException('Email is exist!');
    }

    return await this.databaseService.user.create({
      data: createUserDto,
    });
  }

  async find(filterDto: FilterUserDto) {
    const startDate: Date = new Date(filterDto.startDate);
    const endDate: Date = new Date(filterDto.endDate);
    const skipAmount: number = (filterDto.pageNumber - 1) * filterDto.pageLimit;

    return await this.databaseService.user.findMany({
      take: filterDto.pageLimit,
      skip: skipAmount,
      where: {
        created_at: {
          gte: startDate,
          lte: endDate,
        },
        status: {
          equals: getStatus(filterDto.status),
        },
        name: {
          contains:
            filterDto.nameContainsChars == ''
              ? undefined
              : filterDto.nameContainsChars,
        },
        deleted_at: {
          equals: new Date(0),
        },
      },
      orderBy: {
        created_at: 'desc',
      },
    });
  }

  async count(filterDto: FilterUserDto) {
    const startDate: Date = new Date(filterDto.startDate);
    const endDate: Date = new Date(filterDto.endDate);

    return await this.databaseService.user.count({
      where: {
        created_at: {
          gte: startDate,
          lte: endDate,
        },
        status: {
          equals: getStatus(filterDto.status),
        },
        name: {
          contains:
            filterDto.nameContainsChars == ''
              ? undefined
              : filterDto.nameContainsChars,
        },
        deleted_at: {
          equals: new Date(0),
        },
      },
    });
  }

  async findOne(id: number) {
    return await this.databaseService.user.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return await this.databaseService.user.update({
      where: {
        id,
      },
      data: updateUserDto,
    });
  }

  remove(id: number) {
    return this.databaseService.user.update({
      where: {
        id,
      },
      data: {
        deleted_at: new Date(),
      },
    });
  }
}
