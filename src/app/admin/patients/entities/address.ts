import { AddressPrntType } from "./address-prnt-type";
import { AddressStatus } from "./address-status";
import { AddressType } from "./address-type";
import { Country } from "./country";

export interface Address {
    addressKy:number;
    addressPrntType:AddressPrntType;
    addressPrimary:boolean;
    addressType:AddressType;
    addressValid:AddressStatus;
    addressStreetNumber:number;
    addressAvenueLabel:string;
    addressPostalCode:string;
    addressApartmentNumber:number;
    addressBuildingLabel:string;
    addressResidenceLabel:string;
    addressDetails:string;
    addressCity:string;
    addressCountry:Country
    addressStreetLabel:string;
}
