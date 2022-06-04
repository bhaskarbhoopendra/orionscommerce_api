interface IfreightRate {
  zone: string;
  pincodeType: string;
  weightType: string;
  lowerBound: number;
  upperBound: number;
  rate: number;
  zoneName: string;
  pincodeTypeName: string;
  save(): any;
}

export default IfreightRate;
