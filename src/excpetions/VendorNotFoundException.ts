import HttpException from "./HttpException";

class VendorNotFoundException extends HttpException {
  constructor(id: string) {
    super(400, `Vendor with that ${id} does not exist`);
  }
}

export default VendorNotFoundException;
