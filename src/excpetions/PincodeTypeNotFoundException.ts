import HttpException from "./HttpException";

class PincodeTypeNotFoundException extends HttpException {
  constructor(id: string) {
    super(401, `PincodeType with ${id} not found`);
  }
}

export default PincodeTypeNotFoundException;
