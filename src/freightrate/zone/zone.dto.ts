import { IsString, IsNumber } from "class-validator";

class ZoneDto {

  @IsString()
  name: string;

  @IsNumber()
  maximumDistance: number;

  @IsNumber()
  minimumDistance: number;

}

export default ZoneDto;