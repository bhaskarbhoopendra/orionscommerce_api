import IItem from "./item.interface";

interface ICart {
  save(): any;
  items: IItem;
  subTotal: number;
}

export default ICart;
