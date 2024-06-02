import { LeService } from 'app/doctor/patient/entities/LeService';
import { FunctionalUnit } from './functional-unit';

export interface ServiceZone {
  serviceZone_ky: number;
  serviceZone_Nm: string;
  leservice: LeService;
  functionalUnits: FunctionalUnit[];
}
