import nanoIdGenerator from "../util/nanoId";
import AvailableDto from "./Dtos/availability.dto";
import CasualDto from "./Dtos/casual.dto";
import DimensionDto from "./Dtos/dimension.dto";
import ProductDTO from "./Dtos/product.dto";
import VolumetricDTO from "./Dtos/volumetric.dto";
import ProductModel from "./product.model";
import ProductRepository from "./product.repository";

class ProductService {
  public product = ProductModel;
  public nanoId = nanoIdGenerator();
  public productRepository = new ProductRepository();
  constructor() {}

  public addProduct = async (productData: ProductDTO, imagePath: any) => {
    const productAvailability: AvailableDto = productData.availability;
    const casuals: CasualDto = productData.casuals;
    const productDimensions: DimensionDto = productData.dimensions;
    const productVolumetric: VolumetricDTO = productData.valumetric;
    const productName: string = productData.productName;
    console.log(productName.toString);
    console.log(this.nanoId);

    let newProduct = new this.product({
      productName: productName,
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
  };

  public updateSingleProduct = async (
    productId: string,
    productData: ProductDTO,
    filePath: any
  ) => {
    const productAvailability: AvailableDto = productData.availability;
    const casuals: CasualDto = productData.casuals;
    const productDimensions: DimensionDto = productData.dimensions;
    const productVolumetric: VolumetricDTO = productData.valumetric;
    if (!filePath) return "No path";
    const upDatedProduct: ProductDTO = {
      productName: productData.productName,
      price: productData.price,
      discountedPrice: productData.discountedPrice,
      productImage: filePath,
      dimensions: productDimensions,
      availability: productAvailability,
      casuals: casuals,
      SKU: productData.SKU,
      valumetric: productVolumetric,
    };
    await this.productRepository.productByIdAndUpdate(productId, {
      $set: upDatedProduct,
    });
    return "Product Updated";
  };
}

export default ProductService;
