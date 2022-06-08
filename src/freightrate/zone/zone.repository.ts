import ZoneDto from "./zone.dto";
import zoneModel from "./zone.model"



class ZoneRepository {
  public zone = zoneModel;
  public data: ZoneDto;
  public id: string;

  constructor() {
    this.createZone(this.data);
    this.getAllZoneData();
    this.updateZoneData(this.id, this.data);
    this.deleteZone(this.id);
    this.getZoneById(this.id);

  }

  createZone = async (zoneData: ZoneDto) => {
    return await this.zone.create(zoneData);
  }

  getAllZoneData = async () => {
    return await this.zone.find({});
  }

  getZoneById = async (id: string) => {
    return await this.zone.findById(id);
  }

  updateZoneData = async (id: string, zoneData: ZoneDto) => {
    return await this.zone.findByIdAndUpdate(id, zoneData);
  }
  deleteZone = async (id: string) => {
    return await this.zone.findByIdAndDelete(id);
  }
}

export default ZoneRepository;