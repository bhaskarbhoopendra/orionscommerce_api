interface User {
  _id: string;
  firstName?: string;
  lastName?: string;
  email: string;
  password: string;
  address?: {
    street?: string;
    city?: string;
    pincode?: Number;
    phoneNumber?: Number;
    country?: string;
  };
}

export default User;
