interface User {
  _id: string;
  firstName?: string;
  lastName?: string;
  email: string;
  password: string;
  address: object[];
  // address?: {
  //   addressType: string;
  //   street?: string;
  //   city?: string;
  //   pincode?: Number;
  //   phoneNumber?: Number;
  //   country?: string;
  // };
}

export default User;
