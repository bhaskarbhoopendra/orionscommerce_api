import { Request, Router, Response } from "express";
import idNotFroundException from "../excpetions/idNotFoundException";
import Controller from "../interfaces/controller.interface";
import FreightRateService from "./freightRate.service";

class FreightRateController implements Controller {
  public path = "/freightrate";
  public router = Router();
  freightRateService = new FreightRateService();
  constructor() {
    this.initiializeRoutes();
  }

  private initiializeRoutes() {
    this.router.post(
      `${this.path}/create/rate/chart/:zoneId/:pincodeTypeId`,
      this.createRateChart
    );

    this.router.post(
      `${this.path}/create/rate/chart/:zoneId/:pincodeTypeId/update/:freightRateId`,
      this.updateFreightrRate
    );
  }

  private createRateChart = async (request: Request, response: Response) => {
    try {
      const zoneId = request.params.zoneId;
      if (zoneId == undefined) throw new idNotFroundException(zoneId);
      const pincodeTypeId = request.params.pincodeTypeId;
      if (pincodeTypeId == undefined)
        throw new idNotFroundException(pincodeTypeId);
      const { weightType, lowerBound, upperBound, rate } = request.body;

      const data = await this.freightRateService.createFreightRateChart(
        zoneId,
        pincodeTypeId,
        weightType,
        lowerBound,
        upperBound,
        rate
      );
      response.send({ data });
    } catch (error) {
      return error;
    }
  };

  private updateFreightrRate = async (request: Request, response: Response) => {
    try {
      const data = await this.freightRateService.updateFregightRate();
    } catch (error) {
      return error;
    }
  };
}

export default FreightRateController;
