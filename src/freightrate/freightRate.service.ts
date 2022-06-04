import PincodeTypeNotFoundException from "../excpetions/PincodeTypeNotFoundException";
import ZoneNotFoundException from "../excpetions/ZoneNotFoundException";
import FreightRateModel from "./freightRate.model";
import IPincodeType from "./pincodetype/pincode.interface";
import PincodeRepository from "./pincodetype/pincode.repository";
import IZone from "./zone/zone.interface";
import ZoneRepository from "./zone/zone.repository";

class FreightRateService {
  freightRateChart = FreightRateModel;
  public zoneRepository = new ZoneRepository();
  public pincodeTypeRepository = new PincodeRepository();
  constructor() {}

  public createFreightRateChart = async (
    zoneId: string,
    pincodeTypeId: string,
    weightType: string,
    lowerBound: number,
    upperBound: number,
    rate: number
  ) => {
    const zone: IZone | null = await this.zoneRepository.zoneById(zoneId);
    if (!zone) throw new ZoneNotFoundException(zoneId);
    const pincodeType: IPincodeType | null =
      await this.pincodeTypeRepository.pincodeById(pincodeTypeId);
    if (!pincodeType) throw new PincodeTypeNotFoundException(pincodeTypeId);

    const freightRateChart = new this.freightRateChart({
      zone: zoneId,
      zoneName: zone?.zoneName,
      pincodeType: pincodeTypeId,
      pincodeTypeName: pincodeType?.pincodeTypeName,
      weightType: weightType,
      upperBound: upperBound,
      lowerBound: lowerBound,
      rate: rate,
    });
    const data = await freightRateChart.save();
    console.log(data);
    return data;
  };
}

export default FreightRateService;
