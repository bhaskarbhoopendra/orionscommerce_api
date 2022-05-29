import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from "class-validator";
import CreateAddressDto from "./address.dto";
import { Role } from "./roles.enum";

class CreateUserDto {
  @IsString()
  public firstName: string;

  @IsString()
  public lastName: string;

  @IsString()
  public email: string;

  @IsString()
  public password: string;

  @IsEnum(Role)
  public role: Role;

  @IsOptional()
  @ValidateNested()
  public address?: CreateAddressDto;
}

export default CreateUserDto;
