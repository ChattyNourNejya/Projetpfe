import { RoomGroup } from './room-group';
import { ServiceZone } from './service-zone';

export interface FunctionalUnit {
  functionalUnit_Ky: number;
  functionalUnit_PrntKy: number;
  functionalUnit_Nm: string;
  roomList: RoomGroup[];
  serviceZone: ServiceZone;
}
