import { Insurance } from 'app/admin/insurance/insurance';
import { Patient } from './patient';
import { StayType } from './stay-type';
import { StayStatus } from './stay-status';
import { LeService } from './LeService';
import { StayRoom } from './stay-room';

export interface Stay {
  stayKy: number;
  stayPrntPatient: Patient;
  insurances: Insurance[];
  stayPertinentService: LeService[];
  stayEmergencyContact: string;
  stayType: StayType;
  stayFamilyDoctor: string;
  stay_family_doctor_email: string;
  stay_family_doctor_phone: number;
  stayPrevisionalBegin: Date;
  stayPrevisionalEnd: Date;
  stayStatus: StayStatus;
  stayNote: string;
  stayRooms:StayRoom[];
}
