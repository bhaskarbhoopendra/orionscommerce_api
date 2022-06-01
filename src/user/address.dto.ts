import { IsEnum, IsNumber, IsString } from "class-validator";
import AddressTypeEnum from "../enums/enums.address";

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

  @IsEnum(AddressTypeEnum)
  addressType: AddressTypeEnum;
}

export default CreateAddressDto;
