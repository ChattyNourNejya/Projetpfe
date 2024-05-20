import { Insurance } from "app/admin/insurance/insurance";
import { Patient } from "./patient";
import { StayType } from "./stay-type";
import { StayStatus } from "./stay-status";
import { LeService } from "./LeService";

export interface Stay {

  stayKy: number;
  stayPrntPatient: Patient;
  insurances: Insurance[];
  stayPertinentService: LeService[];
  stayEmergencyContact: string;
  stayType: StayType;
  stayFamilyDoctor: string;
  stayPrevisionalBegin: Date;
  stayPrevisionalEnd: Date;
  stayStatus: StayStatus;
  stayNote: string;
}
