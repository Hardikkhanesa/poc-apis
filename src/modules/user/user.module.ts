import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UsersService } from './user.service';
import { UserController } from './user.controller';
import { ConfigModule, ConfigService } from 'modules/config';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from 'modules/auth';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    forwardRef(() =>  AuthModule),
    ConfigModule,
],
  exports: [UsersService],
  controllers:[ UserController],
  providers: [UsersService],
})
export class UserModule {}
