import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, MinLength } from "class-validator";

export class CreateTodoDto {
    
      @ApiProperty({
        required: true,
      })
      @IsNotEmpty()
      title: string;
    
      @ApiProperty({
        required: false,
      })
      @IsOptional()
      description: string;

      @ApiProperty({
        required: false,
      })
      @IsOptional()
      done: boolean;
    
}
