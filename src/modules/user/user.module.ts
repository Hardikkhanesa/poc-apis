import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UsersService } from './user.service';
import { UserController } from './user.controller';
// import { ConfigModule, ConfigService } from 'modules/config';

import { AuthModule } from '../auth';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    forwardRef(() =>  AuthModule),
    // ConfigModule,
],
  exports: [UsersService],
  controllers:[ UserController],
  providers: [UsersService],
})
export class UserModule {}
