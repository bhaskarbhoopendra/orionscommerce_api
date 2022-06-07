import User from "../user/user.interface";
import IItem from "./item.interface";

interface ICart {
  user: string;
  save(): any;
  items: IItem;
  subTotal: number;
}

export default ICart;
