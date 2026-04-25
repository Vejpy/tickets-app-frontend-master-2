export enum DeviceType {
  PC = "PC",
  NOTEBOOK = "NOTEBOOK",
  PRINTER = "PRINTER",
  OTHER = "OTHER",
}

export interface Device {
  id: string;
  name: string;
  type: DeviceType;
  serialNumber: string;
  roomId: string;
}
