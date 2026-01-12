import { Controller, Post, Body, Patch, Param, Delete, ClassSerializerInterceptor, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { UserRequestDTO, UserResponseDTO } from 'src/dto/user.dto';
import FilterDTO from 'src/dto/filter.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('/create')
  create(@Body() createUserDto: UserRequestDTO): Promise<UserResponseDTO> {
    return this.userService.create(createUserDto);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  find(@Body() filterDto: FilterDTO): Promise<UserResponseDTO[]> {
    return this.userService.find(filterDto);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('/count')
  count(@Body() filterDto: FilterDTO): Promise<number> {
    return this.userService.count(filterDto);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UserRequestDTO): Promise<boolean> {
    return this.userService.update(+id, updateUserDto);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Delete(':id')
  remove(@Param('id') id: string): Promise<boolean> {
    return this.userService.remove(+id);
  }
}
