import { Injectable, NotAcceptableException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User, UserFillableFields } from './user.entity';
import { DeleteUserPayload, UserPayload } from './user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async get(id: number) {
    return this.userRepository.findOne({ id });
  }

  async getByEmail(email: string) {
    return await this.userRepository.findOne({ email });
  }

  async create(payload: UserFillableFields) {
    const user = await this.getByEmail(payload.email);
  
    if (user) {
      throw new NotAcceptableException(
        'User with provided email already created.',
      );
    }
  
    return await this.userRepository.save(payload);
  }

  async update(payload: UserPayload) {
    const user = await this.getByEmail(payload.email);
  
    if(!user){
      throw new NotAcceptableException(
        'User with provided email not exist.',
      );
    }
    user.firstName=payload.firstName;
    user.lastName=payload.lastName;
    user.password=payload.password
    return await this.userRepository.save(user); 
  }

  async delete(payload: DeleteUserPayload) {
    const user = await this.getByEmail(payload.email);
    if(!user){
      throw new NotAcceptableException(
        'User with provided email not exist.',
      );
    }
    await this.userRepository.remove(user); 
    return 'User Removed'
  }

}
