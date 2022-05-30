import { IsBoolean, IsEnum, IsOptional, IsString } from "class-validator";
import CreateUserDto from "../user/user.dto";
import VerifiedStatus from "../enums/enums.vendor";

class CreatevendorDto extends CreateUserDto {
  @IsString()
  organization?: string;

  @IsString()
  company?: string;

  @IsEnum(VerifiedStatus)
  isConfirmedvendor?: VerifiedStatus;

  @IsBoolean()
  isVendor: boolean;

  @IsString()
  @IsOptional()
  warehouse: string;
}

export default CreatevendorDto;
