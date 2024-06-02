import { ServiceZone } from "./service-zone";
import { Site } from "./site";
import { StaffGroup } from "./staff-group";
import { Stay } from "./stay";
import { StayRoom } from "./stay-room";

export interface LeService {
    service_ky: number;
    service_Nm: string;
    site: Site;
    servicezone: ServiceZone[];
    staffGroup: StaffGroup[];
    stay: Stay;
    stayRoom:StayRoom[];
}