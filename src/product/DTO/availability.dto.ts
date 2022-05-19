import { IsBoolean, IsString } from "class-validator";

class AvailableDto {
  @IsBoolean()
  isAreaCalculate: Boolean;

  @IsBoolean()
  isCancelable: Boolean;

  @IsBoolean()
  isRefundable: Boolean;

  @IsBoolean()
  isReturnable: Boolean;

  @IsBoolean()
  isCod: Boolean;

  @IsBoolean()
  isGst: Boolean;

  @IsBoolean()
  isAvailable: Boolean;

  @IsBoolean()
  isDeliveryCharges: Boolean;
}

export default AvailableDto;
