import { IsBoolean, IsEnum, IsString } from "class-validator";
import CreateUserDto from "../user/user.dto";
import StatusOfVendorEnum from "./enums.vendor";

class CreatevendorDto extends CreateUserDto {
  @IsString()
  organization?: string;

  @IsString()
  company?: string;

  @IsEnum(StatusOfVendorEnum)
  isConfirmedvendor?: StatusOfVendorEnum;

  @IsBoolean()
  isVendor: boolean;
}

export default CreatevendorDto;
