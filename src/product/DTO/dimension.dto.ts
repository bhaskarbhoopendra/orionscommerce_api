import { IsNumber, IsString } from "class-validator";

class DimensionDto {
  @IsNumber()
  weight: Number;

  @IsNumber()
  height: Number;

  @IsNumber()
  width: Number;
}

export default DimensionDto;
