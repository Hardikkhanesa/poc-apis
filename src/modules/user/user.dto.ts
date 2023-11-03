import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class UserPayload {
    
  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    required: false,
  })
  @MinLength(5)
  password: string;


  @ApiProperty({
    required: false,
  })
  firstName: string;

  @ApiProperty({
    required: false,
  })
  lastName: string;

}


export class DeleteUserPayload{

    @ApiProperty({
        required: true,
    })
    @IsNotEmpty()
    @IsEmail()
    email: string;
    
}