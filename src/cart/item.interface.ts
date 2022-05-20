interface IItem {
  [x: string]: any;
  //   findIndex(arg0: (item: any) => boolean): any;
  //   splice(indexFound: any, arg1: number): any;
  length: number;
  //   map(arg0: (item: any) => any): any;
  //   push(arg0: {
  //     productId: any;
  //     quantity: number;
  //     price: number;
  //     total: number;
  //   }): any;
  items: [productId: string, quantity: number, price: number, total: number];
}

export default IItem;
