import ProductDTO from "./DTO/product.dto";
import ProductModel from "./product.model";

class ProductService {
  public product = ProductModel;
  constructor() {}

  public addProduct = async (productData: ProductDTO, imagePath: any) => {
    let newProduct = new this.product({
      productName: productData.productName,
      price: productData.price,
      discountedPrice: productData.discountedPrice,
      productImage: imagePath,
      dimensions: {
        weight: productData.dimensions.weight,
        height: productData.dimensions.height,
        width: productData.dimensions.width,
      },
      availability: {
        isAreaCaluclate: productData.availablity.isAreaCaluclate,
        isCancelable: productData.availablity.isCancelable,
        isRefundable: productData.availablity.isRefundable,
        isReturnable: productData.availablity.isReturnable,
        isCod: productData.availablity.isCod,
        isGst: productData.availablity.isGst,
        isAvailable: productData.availablity.isAvailable,
        isDeliveryCharges: productData.availablity.isDeliveryCharges,
      },
    });

    const product = await newProduct.save();
    return product;
  };
}

export default ProductService;
