import { Request, Router, Response } from "express";
import idNotFroundException from "../excpetions/idNotFoundException";
import Controller from "../interfaces/controller.interface";
import FreightRateModel from "./freightRate.model";
import FreightRateService from "./freightRate.service";
import PincodeRepository from "./pincodetype/pincode.repository";
import ZoneRepository from "./zone/zone.repository";

class FreightRateController implements Controller {
  public path = "/freightrate";
  public router = Router();
  freightRateChart = FreightRateModel;
  public zoneRepository = new ZoneRepository();
  public pincodeTypeRepository = new PincodeRepository();
  freightRateService = new FreightRateService();
  constructor() {
    this.initiializeRoutes();
  }

  private initiializeRoutes() {
    this.router.post(
      `${this.path}/create/rate/chart/:zoneId/:pincodeTypeId`,
      this.createRateChart
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
}

export default FreightRateController;
