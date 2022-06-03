import { ParamsDictionary } from "express-serve-static-core";
import ZoneDTO from "./zone.dto";
import IZone from "./zone.interface";
import zoneModel from "./zone.model";

class ZoneRepository {
  public zone = zoneModel;
  public id: string;
  public data: any;

  constructor() {
    this.createZone(this.data);
    this.getAllZone();
    this.zoneById(this.id);
    this.zoneByIdAndUpdate(this.id, this.data);
    this.zoneByIdAndDelete(this.id);
  }

  public createZone = async (data: IZone): Promise<ZoneDTO> => {
    return await this.zone.create(data);
  };

  public getAllZone = async () => {
    return await this.zone.find();
  };

  public zoneById = async (id: string) => {
    return await this.zone.findById(id);
  };

  public zoneByIdAndUpdate = async (id: string, data: any) => {
    return this.zone.findByIdAndUpdate(id, data, { new: true });
  };

  public zoneByIdAndDelete = async (id: string | ParamsDictionary) => {
    return await this.zone.findByIdAndDelete(id);
  };
}

export default ZoneRepository;
