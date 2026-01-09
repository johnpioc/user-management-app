import { IsString, IsInt } from 'class-validator';
import { Type } from 'class-transformer';

export default class FilterDTO {
    @IsString()
    startDate: string

    @IsString()
    endDate: string

    @Type(() => Number)
    @IsInt()
    pageLimit: number

    @Type(() => Number)
    @IsInt()
    pageNumber: number

    @IsString()
    status: string

    @IsString()
    nameContainsChars: string
}