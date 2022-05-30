import { IsBoolean, IsString } from "class-validator";
import CreateUserDto from "../user/user.dto";

class CreatevendorDto extends CreateUserDto {
  @IsString()
  organization?: string;

  @IsString()
  company?: string;

  @IsBoolean()
  isConfirmedvendor: boolean;

  @IsBoolean()
  isVendor: boolean;
}

export default CreatevendorDto;
