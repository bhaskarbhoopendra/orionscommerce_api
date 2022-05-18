import {
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from "class-validator";
import AvailableDto from "./availability.dto";
import DimensionDto from "./dimension.dto";

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
  availablity: AvailableDto;
}

export default ProductDTO;
