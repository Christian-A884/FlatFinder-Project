export interface User {
  uid: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword:string;
  birthday: string;
  role:string
}

export interface Flat {
  id: string,
  city: string;
  streetName: string;
  streetNumber: number;
  areaSize: number;
  hasAC: boolean;
  yearBuilt: number;
  rentPrice: number;
  dateAvailable: Date;
  userLastName: string;
  userFirstName: string;
  userEmail: string
}