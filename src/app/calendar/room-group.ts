import { Room } from './room';

export interface RoomGroup {
  roomGroup_Ky: number;
  roomGroup_PrntKy: number;
  roomGroup_Nm: string;

  rooms: Room[];
}
