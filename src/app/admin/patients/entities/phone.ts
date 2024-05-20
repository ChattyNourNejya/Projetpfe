import { Country } from "./country";
import { PhonePrntType } from "./phone-prnt-type";
import { PhoneType } from "./phone-type";

export interface Phone{
    phoneKy:number;
    phonePrntType:PhonePrntType;
    phonePrimary:boolean;
    phoneCountry:Country;
    phoneProfessional:boolean;
    phoneNumber:string;
    phoneType:PhoneType;
    phoneReceiveSMS:boolean;

}