import { IsNumber, IsString } from "class-validator";

class ZoneDTO {
  @IsString()
  zoneName: string;

  @IsNumber()
  minimumDistance: number;

  @IsNumber()
  maximumDistance: number;
}

export default ZoneDTO;
