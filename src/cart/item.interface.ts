interface IItem {
  [x: string]: any;

  items: [productId: string, quantity: number, price: number, total: number];
}

export default IItem;
