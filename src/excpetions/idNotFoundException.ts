import HttpException from "./HttpException";

class idNotFroundException extends HttpException {
  constructor(id: string) {
    super(401, `Prodcut with ${id} not found`);
  }
}

export default idNotFroundException;
