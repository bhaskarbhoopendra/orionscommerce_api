import { IsEnum, IsNumber, IsString } from "class-validator";

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
}

export default CreateAddressDto;
