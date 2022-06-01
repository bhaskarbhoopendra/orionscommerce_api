import AddressTypeEnum from "../enums/enums.address";

interface IuserAddress {
  addressType: AddressTypeEnum;
  city: string;
  country: string;
  street: String;
  pincode: number;
  phoneNumber: number;
  user: string;
}

export default IuserAddress;
