import ProductDTO from "./product.dto";
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
    });

    const product = await newProduct.save();
    return product;
  };
}

export default ProductService;
