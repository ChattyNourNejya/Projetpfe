import { Site } from "app/patient/patient/entities/site";
import { StaffStatus } from "./staff-status";
import { StaffRole } from "./staff-role";

  export interface Staff {
    staffKy: number;
    staffNm: string;
    staffFrstNm: string;
    staffStatus: StaffStatus;
    medVisitSchdldId: number;
    leServiceId?: number;
    staffRole: StaffRole;
    site: Site;
    serviceId: number;
  }
