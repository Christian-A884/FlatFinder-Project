import { db } from "../../firebase/firebase.config";
import { setDoc, doc, getDocs, collection, DocumentData } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { Flat} from "../../../interface";
import { fetchUser } from "../auth/users";



export async function addNewFlat(flat: Flat) {
  const loggedUser = JSON.parse(localStorage.getItem("loggedUser") as string);
  const user = await fetchUser(loggedUser);
  console.log(user)

  if(user) {
  
  const uid = uuidv4();
  await setDoc(doc(db, "flats",uid ), {
    id: uid,
    city: flat.city,
    streetName: flat.streetName,
    streetNumber: flat.streetNumber,
    areaSize: flat.areaSize,
    hasAC: flat.hasAC,
    yearBuilt: flat.yearBuilt,
    rentPrice: flat.rentPrice,
    dateAvailable: flat.dateAvailable,
    userLastName: user.lastName,
    userFirstName:user.firstName,
    userEmail: user.email
    
  });
  console.log("Flat added");
} else {
  console.error("No user is logged in")
}}

export async function showFlats() {
  const arr: DocumentData[] = [];
  const data = await getDocs(collection(db, "flats"));
  data.forEach((doc) => {
    arr.push(doc.data());
  });
  return arr;
}
