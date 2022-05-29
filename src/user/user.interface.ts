import { Role } from "./roles.enum";

interface User {
  _id: string;
  firstName?: string;
  lastName?: string;
  email: string;
  password: string;
  role: Role;
  address?: {
    street?: string;
    city?: string;
    pincode?: Number;
    phoneNumber?: Number;
    country?: string;
  };
}

export default User;
