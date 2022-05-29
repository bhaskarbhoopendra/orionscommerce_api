import { IsEnum, IsNumber, IsString } from "class-validator";
import { Role } from "./roles.enum";

class CreateAddressDto {
  @IsString()
  public street: string;

  @IsString()
  public city: string;

  @IsString()
  public country: string;

  @IsNumber()
  pincode: Number;

  @IsNumber()
  phoneNumber: Number;

  @IsEnum(Role)
  role: Role;
}

export default CreateAddressDto;
