import HttpException from "./HttpException";

class WrongAuthenticationTokenException extends HttpException {
  constructor() {
    super(401, "Wrong token");
  }
}

export default WrongAuthenticationTokenException;
