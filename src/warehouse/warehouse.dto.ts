import { IsNumber, IsString } from "class-validator"

class WarehouseDTo {
    @IsString()
    warehouseName: string;
    
    @IsString()
    address: string;

    @IsString()
    city: string;

    @IsString()
    street: string;
    
    @IsNumber()    
    pincode : number;
}


export default WarehouseDTo