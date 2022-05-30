import { IsBoolean, IsString } from "class-validator";

class CreateAdminDto {
  @IsString()
  email: string;

  @IsString()
  password: string;

  @IsBoolean()
  isAdmin: boolean;
}

export default CreateAdminDto;
