import HttpException from "./HttpException";

class ProdutNotFoundException extends HttpException {
  constructor(id: string) {
    super(401, `Prodcut with ${id} not found`);
  }
}

export default ProdutNotFoundException;
