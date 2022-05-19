import { IsBoolean, IsNumber } from "class-validator";

class VolumetricDTO {
  @IsBoolean()
  isVolumetircWeight: Boolean;

  @IsNumber()
  upperBound: Number;

  @IsNumber()
  lowerBound: Number;
}

export default VolumetricDTO;
