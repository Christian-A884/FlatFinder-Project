import { Timestamp } from "firebase/firestore";

export interface User {
  uid: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword:string;
  birthday: string;
  role:string
  favourite: FavFlat[]
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
  isFavourite: boolean;
  ownerLastName: string;
  ownerFirstName: string;
  ownerEmail: string;
  ownerId: string
}

export interface FavFlat {
 flatId: string
}

export interface Message {
  messageContent: string;
  senderLastname: string;
  senderFirstname: string;
  senderEmail: string;
  flatId: string;
  date: Timestamp
}