import User from "../user/user.interface";

interface Ivendor extends User {
  organization?: string;
  company?: string;
  isVendor: boolean;
  isConfirmedvendor?: boolean;
}

export default Ivendor;
