import * as internal from "stream"

export interface User {
  id: number;
  userName: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
  role: number;
  firstWorkingDay: Date;
  Demandes: [];
  holiday: {}
}
