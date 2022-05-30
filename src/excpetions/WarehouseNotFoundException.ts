import HttpException from "./HttpException";

class WarehouseNotFoundException extends HttpException {
  constructor(id: string) {
    super(400, `Warehouse with that ${id} does not exist`);
  }
}

export default WarehouseNotFoundException;
