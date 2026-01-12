import { Expose } from 'class-transformer';
import { IsString, IsInt, IsEnum } from 'class-validator';
import { Prisma, Status } from 'generated/prisma/client';

export class UserResponseDTO {
    @IsInt()
    id: number;

    @IsString()
    name: string;

    @IsString()
    email: string;

    @IsString()
    role: string;

    @IsEnum(Status)
    status: Status;

    @IsString()
    created_at: string;

    @IsString()
    updated_at: string;

    @IsString()
    deleted_at: string;

    constructor(userModel: Prisma.UserModel) {
        Object.assign(this, userModel);
    }
}

export class UserRequestDTO {
    @IsString()
    @Expose()
    name: string;

    @IsString()
    @Expose()
    email: string;

    @IsString()
    @Expose()
    role: string;

    @IsEnum(Status)
    @Expose()
    status: Status;

    @IsString()
    @Expose()
    deleted_at: string;
}