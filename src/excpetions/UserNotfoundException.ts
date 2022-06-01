import HttpException from "./HttpException";

class UserNotFoundException extends HttpException {
  constructor(id: string) {
    super(401, `User with ${id} not found`);
  }
}

export default UserNotFoundException;
