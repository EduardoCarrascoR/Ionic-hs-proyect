export interface Guard {

  user_id?: number;
  firstname: string;
  lastname: string;
  email?: string;
  rut: string;
  phone: string;
  createdAt?: any;
  lastLogin?: any;
  accessToken?: string;
  emailVerified?: string;
  password?: string;

}