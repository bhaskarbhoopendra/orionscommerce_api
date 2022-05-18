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
    isAreaCaluclate: Boolean;
    isCancelable: Boolean;
    isRefundable: Boolean;
    isReturnable: Boolean;
    isCod: Boolean;
    isGst: Boolean;
    isAvailable: Boolean;
    isDeliveryCharges: Boolean;
  };
}

export default IProduct;
