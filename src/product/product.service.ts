import ProductDTO from "./DTO/product.dto";
import ProductModel from "./product.model";

class ProductService {
  public product = ProductModel;
  constructor() {}

  public addProduct = async (productData: ProductDTO, imagePath: any) => {
    const productAvailability = productData.availability;

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
        isAreaCalculate: productAvailability.isAreaCalculate,
        isCancelable: productAvailability.isCancelable,
        isRefundable: productAvailability.isRefundable,
        isReturnable: productAvailability.isReturnable,
        isCod: productAvailability.isCod,
        isGst: productAvailability.isGst,
        isAvailable: productAvailability.isAvailable,
        isDeliveryCharges: productAvailability.isDeliveryCharges,
      },
    });

    const product = await newProduct.save();
    return product;
  };
}

export default ProductService;
