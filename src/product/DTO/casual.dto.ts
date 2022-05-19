import { IsNumber, IsString } from "class-validator";

class CasualDto {
  @IsNumber()
  stock: Number;

  @IsNumber()
  minimumQaunitity: Number;

  @IsNumber()
  maximumQuantity: Number;

  @IsNumber()
  unitPerBox: Number;

  @IsString()
  manufacturer: String;

  @IsString()
  madeIn: String;
}

export default CasualDto;
