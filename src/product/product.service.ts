import nanoIdGenerator from "../util/nanoId";
import AvailableDto from "./DTO/availability.dto";
import CasualDto from "./DTO/casual.dto";
import DimensionDto from "./DTO/dimension.dto";
import ProductDTO from "./DTO/product.dto";
import VolumetricDTO from "./DTO/volumetric.dto";
import ProductModel from "./product.model";

class ProductService {
  public product = ProductModel;
  public nanoId = nanoIdGenerator();
  constructor() {}

  public addProduct = async (productData: ProductDTO, imagePath: any) => {
    const productAvailability: AvailableDto = productData.availability;
    const casuals: CasualDto = productData.casuals;
    const productDimensions: DimensionDto = productData.dimensions;
    const productVolumetric: VolumetricDTO = productData.valumetric;
    console.log(this.nanoId);
    try {
      let newProduct = new this.product({
        productName: productData.productName,
        price: productData.price,
        discountedPrice: productData.discountedPrice,
        productImage: imagePath,
        dimensions: productDimensions,
        availability: productAvailability,
        casuals: casuals,
        SKU: this.nanoId,
        valumetric: productVolumetric,
      });

      const product = await newProduct.save();
      return product;
    } catch (error) {
      console.log(error);
    }
  };
}

export default ProductService;
