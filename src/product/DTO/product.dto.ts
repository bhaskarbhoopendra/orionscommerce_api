import {
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from "class-validator";
import AvailableDto from "./availability.dto";
import CasualDto from "./casual.dto";
import DimensionDto from "./dimension.dto";
import VolumetricDTO from "./volumetric.dto";

class ProductDTO {
  @IsString()
  productName: string;

  @IsNumber()
  price: Number;

  @IsNumber()
  discountedPrice: Number;

  @IsString()
  productImage: string;

  @IsOptional()
  @ValidateNested()
  dimensions: DimensionDto;

  @IsOptional()
  @ValidateNested()
  availability: AvailableDto;

  @IsOptional()
  @ValidateNested()
  casuals: CasualDto;

  @IsOptional()
  @IsNumber()
  SKU: Number;

  @IsOptional()
  @ValidateNested()
  valumetric: VolumetricDTO;
}

export default ProductDTO;
