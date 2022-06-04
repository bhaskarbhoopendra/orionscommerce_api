interface Base {
  zoneName: string;
  minimumDistance: number;
  maximumDistance: number;
  save(): any;
}

interface IZone extends Base {
  id: string;
}

export default IZone;
