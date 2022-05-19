interface IProduct {
  productName: String;
  price: Number;
  discountedPrice: Number;
  productImage: string;
  dimensions: {
    weight: Number;
    height: Number;
    width: Number;
  };
  availability: {
    isAreaCaluclate: String;
    isCancelable: Boolean;
    isRefundable: Boolean;
    isReturnable: Boolean;
    isCod: Boolean;
    isGst: Boolean;
    isAvailable: Boolean;
    isDeliveryCharges: Boolean;
  };
  casuals: {
    stock: Number;
    minimumQaunitity: Number;
    maximumQuantity: Number;
    unitPerBox: Number;
    manufacturer: String;
    madeIn: String;
  };
  SKU: Number;
  valumetric: {
    isVolumetircWeight: Boolean;
    upperBound: Number;
    lowerBound: Number;
  };
}

export default IProduct;
