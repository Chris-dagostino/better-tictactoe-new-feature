import { UpdateInfoRequest as UpdateInfoRequestInterface } from '../interfaces';
import { IsNotEmpty, IsString, MinLength, MaxLength, IsInt, Min, Max, IsBoolean, IsOptional, IsDate} from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateInfoRequest implements UpdateInfoRequestInterface {
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(50)
  name: string;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @Max(150)
  age: number;

  @IsBoolean()
  @IsOptional()
  married?: boolean;

  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  dateOfBirth: Date;
}
