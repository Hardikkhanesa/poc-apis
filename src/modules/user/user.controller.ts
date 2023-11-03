import { Body, Controller, Delete, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from './../common/decorator/current-user.decorator';
import { User, UsersService } from './../user';
import { DeleteUserPayload, UserPayload } from './user.dto';

@Controller('api/user')
@ApiTags('User')
@ApiBearerAuth()
export class UserController {
  constructor(
    private readonly userService: UsersService,
  ) {}

  @Post('update')
  @UseGuards(AuthGuard())
  @ApiResponse({ status: 201, description: 'Successfully updated' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async updateUser(@Body() payload: UserPayload): Promise<any> {
    return await this.userService.update(payload)
  }

  @Delete('remove')
  @UseGuards(AuthGuard())
  @ApiResponse({ status: 201, description: 'Successful Deleted User' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async register(@Body() payload: DeleteUserPayload): Promise<any> {
    return await this.userService.delete(payload);
  }
}
