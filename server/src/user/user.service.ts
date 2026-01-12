import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import FilterDTO from 'src/dto/filter.dto';
import { UserRequestDTO, UserResponseDTO } from 'src/dto/user.dto';
import { plainToInstance } from 'class-transformer';
import { Prisma } from 'generated/prisma/client';
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

  async create(createUserDto: UserRequestDTO): Promise<UserResponseDTO> {
    const response: Prisma.UserModel = await this.databaseService.user.create({ 
        data: plainToInstance(UserRequestDTO, createUserDto)
    });

    return new UserResponseDTO(response);
  }

  async find(filterDto: FilterDTO): Promise<UserResponseDTO[]> {
    const startDate: Date = new Date(filterDto.startDate);
    const endDate: Date = new Date(filterDto.endDate);
    const skipAmount: number = (filterDto.pageNumber - 1) * filterDto.pageLimit;

    const response: Prisma.UserModel[] = await this.databaseService.user.findMany({
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

    return response.map(res => new UserResponseDTO(res));
  }

  async count(filterDto: FilterDTO): Promise<number> {
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

  async update(id: number, updateUserDto: Prisma.UserUpdateInput): Promise<boolean> {
    await this.databaseService.user.update({
      where: { id, },
      data: updateUserDto
    });

    return true;
  }

  async remove(id: number) {
    await this.databaseService.user.update({
      where: { id, },
      data: {
        deleted_at: new Date()
      }
    })

    return true;
  }
}
