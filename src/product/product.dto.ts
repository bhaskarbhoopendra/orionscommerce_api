import { IsNumber, IsString } from "class-validator";

class ProductDTO {
  @IsString()
  productName: string;

  @IsNumber()
  price: Number;

  @IsNumber()
  discountedPrice: Number;

  @IsString()
  productImage: string;
}

export default ProductDTO;
