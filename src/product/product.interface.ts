interface IProduct {
  productName: string;
  price: number;
  discountedPrice: number;
  productImage: string;
  dimensions: {
    weight: number;
    height: number;
    width: number;
  };
  availability?: {
    isAreaCaluclate: string;
    isCancelable: boolean;
    isRefundable: boolean;
    isReturnable: boolean;
    isCod: boolean;
    isGst: boolean;
    isAvailable: boolean;
    isDeliveryCharges: boolean;
  };
  casuals: {
    stock: number;
    minimumQaunitity: number;
    maximumQuantity: number;
    unitPerBox: number;
    manufacturer: string;
    madeIn: string;
  };
  SKU: number;
  valumetric: {
    isVolumetircWeight: boolean;
    upperBound: number;
    lowerBound: number;
  };
}

export default IProduct;
