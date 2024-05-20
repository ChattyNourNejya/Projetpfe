
import { Address } from "./address";
import { Gender } from "./gender";
import { IdentityType } from "./identity-type";
import { MaritalStatus } from "./marital-status";
import { Nationality } from "./nationality";
import { PatientStatus } from "./patient-status";
import { Email } from "./email";
import { Phone } from "./phone";

export interface Patient  {
    status: number;
    patientKy:number;
    patientImg:string;
    patientLastName: string;
    patientFirstName: string;
    patientMiddleName: string; //SSN
    patientIdentityNumber:string;
    patientIdentityType:IdentityType;
    patientBirthDate: Date;
    patientGender: Gender;
    patientMaritalStatus:MaritalStatus;
    patientNationality: Nationality;    
    patientDeathDate:Date;
    patientDeathRemarks:string;
    patientSize:number;
    patientWeight:number;
    patientRemarks:string;
    patientStatus:PatientStatus;
    phones: Phone[] ;
    addresses:Address[];
    emails:Email[];


}
