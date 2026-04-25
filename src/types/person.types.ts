export enum JobPosition {
  STUDENT = "STUDENT",
  TEACHER = "TEACHER",
  TECHNICIAN = "TECHNICIAN",
  ADMIN = "ADMIN",
}

export interface Person {
  id?: string;
  name: string;
  email: string;
  createdAt?: Date;
  jobPosition: JobPosition;
  // studentId?: string;
}
