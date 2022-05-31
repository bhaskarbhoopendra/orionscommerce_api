import User from "../user/user.interface";

interface Ivendor extends User {
  organization?: string;
  company?: string;
  isVendor?: boolean;
  isConfirmedVendor?: string;
  warehouse?: string[];
}

export default Ivendor;
