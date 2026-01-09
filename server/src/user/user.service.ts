import { Injectable } from '@nestjs/common';
import { Prisma } from 'generated/prisma/client';
import { DatabaseService } from 'src/database/database.service';
import FilterDTO from 'src/dto/filter.dto';

type Status = "ACTIVE" | "INACTIVE" | "SUSPENDED";

const getStatus = (statusString: string): Status | undefined => {
  switch(statusString) {
    case "ACTIVE": return "ACTIVE";
    case "INACIVE": return "INACTIVE";
    case "SUSPENDED": return "SUSPENDED";
    default: return undefined;
  };
}
@Injectable()
export class UserService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createUserDto: Prisma.UserCreateInput) {
    return this.databaseService.user.create({ data: createUserDto });
  }

  async find(filterDto: FilterDTO) {
    const startDate: Date = new Date(filterDto.startDate);
    const endDate: Date = new Date(filterDto.endDate);
    const skipAmount: number = (filterDto.pageNumber - 1) * filterDto.pageLimit;

    return this.databaseService.user.findMany({
      take: filterDto.pageLimit,
      skip: skipAmount,
      where: {
        created_at: {
          gte: startDate,
          lte: endDate
        },
        status: {
          equals: getStatus(filterDto.status)
        },
        name: {
          contains: filterDto.nameContainsChars == "" ? undefined : filterDto.nameContainsChars
        },
        deleted_at: {
          equals: new Date(0)
        }
      },
      orderBy: {
        created_at: "desc"
      }
    })
  }

  async count(filterDto: FilterDTO) {
    const startDate: Date = new Date(filterDto.startDate);
    const endDate: Date = new Date(filterDto.endDate);

    return this.databaseService.user.count({
      where: {
        created_at: {
          gte: startDate,
          lte: endDate
        },
        status: {
          equals: getStatus(filterDto.status)
        },
        name: {
          contains: filterDto.nameContainsChars == "" ? undefined : filterDto.nameContainsChars
        },
        deleted_at: {
          equals: new Date(0)
        }
      },  
    });
  }

  async findOne(id: number) {
    return this.databaseService.user.findUnique({ 
      where: {
        id,
      }
    })
  }

  update(id: number, updateUserDto: Prisma.UserUpdateInput) {
    return this.databaseService.user.update({
      where: { id, },
      data: updateUserDto
    })
  }

  remove(id: number) {
    return this.databaseService.user.update({
      where: { id, },
      data: {
        deleted_at: new Date()
      }
    })
  }
}
