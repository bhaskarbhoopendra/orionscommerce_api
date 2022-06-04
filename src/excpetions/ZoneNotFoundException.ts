import HttpException from "./HttpException";

class ZoneNotFoundException extends HttpException {
  constructor(id: string) {
    super(401, `Zone with ${id} not found`);
  }
}

export default ZoneNotFoundException;
