import { db } from "../../firebase/firebase.config";
import {
  setDoc,
  doc,
  getDocs,
  collection,
  query,
  where,
  DocumentData,
  updateDoc,
  deleteDoc
} from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { FavFlat, Flat, Message } from "../../../interface";
import { fetchUser } from "../auth/users";

export async function addNewFlat(flat: Flat) {
  const loggedUser = JSON.parse(localStorage.getItem("loggedUser") as string);
  const user = await fetchUser(loggedUser);
  console.log(user);

  if (user) {
    const uid = uuidv4();
    await setDoc(doc(db, "flats", uid), {
      id: uid,
      city: flat.city,
      streetName: flat.streetName,
      streetNumber: flat.streetNumber,
      areaSize: flat.areaSize,
      hasAC:flat.hasAC ? "Yes" : "No",
      yearBuilt: flat.yearBuilt,
      rentPrice: flat.rentPrice,
      dateAvailable: flat.dateAvailable,
      isFavourite: false,
      ownerLastName: user.lastName,
      ownerFirstName: user.firstName,
      ownerEmail: user.email,
      ownerId: user.uid,
    });
    console.log("Flat added");
  } else {
    console.error("No user is logged in");
  }
}

export async function updateFlat(updatedFlat: Flat) {
  const flatRef = doc(db, "flats", updatedFlat.id as string);
  console.log("Flat", updatedFlat);
  await updateDoc(flatRef, { ...updatedFlat });
}

export async function showFlats() {
  const arr: DocumentData[] = [];
  const data = await getDocs(collection(db, "flats"));
  data.forEach((doc) => {
    arr.push(doc.data());
  });
  return arr;
}

// export async function getWantedFlat(flats: FavFlat[]) {
//   const arr: DocumentData[] = [];
//   flats.forEach(async (flat) => {
//     const q = query(collection(db, "flats"), where("id", "==", flat.flatId));
//     const data = await getDocs(q);
//     data.forEach((doc) => {
//       console.log(doc.data());
//       arr.push(doc.data());
//     });
//   });

//   return arr;
// }

export async function getWantedFlat(flats: FavFlat[]) {
  const promises = flats.map((flat) => {
    const q = query(collection(db, "flats"), where("id", "==", flat.flatId));
    return getDocs(q);
  });
  const docsArray = await Promise.all(promises);
  const arr: DocumentData[] = [];

  docsArray.forEach((docs) => {
    docs.forEach((doc) => {
      console.log(doc.data());
      arr.push(doc.data());
    });
  });

  return arr;
}
export async function addFavouriteFlat(flats: FavFlat[], newFlat: FavFlat) {
  const index = flats.findIndex((flat) => flat.flatId === newFlat.flatId);

  if (index === -1) {
    flats.push(newFlat as FavFlat);
  } else {
    alert("You already have this flat to favourites");
  }

  const user_id = JSON.parse(localStorage.getItem("loggedUser") as string);
  const flatRef = doc(db, "users", user_id);
  await updateDoc(flatRef, {
    favourite: flats,
  });
  localStorage.setItem("favFlat", JSON.stringify(flats));
  const newFavFlat = await getWantedFlat(flats);
  return newFavFlat;
}

export async function removeFavouriteFlat(id:string, flats: []) {
  const filtered = flats.filter((item:FavFlat) => item.flatId !== id)
  const user_id=JSON.parse(localStorage.getItem("loggedUser")as string)
  const flatRef = doc(db, "users", user_id)
  await updateDoc(flatRef,{
    favourite: filtered
  })
  localStorage.setItem("favFlat",JSON.stringify(filtered))
  const newFavFlat = await getWantedFlat(filtered)
  return newFavFlat
}

export async function getFlatbyId(flatId: string) {
  try {
    const q = query(collection(db, "flats"), where("id", "==", flatId));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      return querySnapshot.docs[0].data();
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error;
    } else {
      console.error(error);
    }
  }
}

export async function getFlatsbyFlatId(flats: Flat[]) {
  const promises = flats.map((flat) => {
    const q = query(collection(db, "flats"), where("id", "==", flat.flatId));
    return getDocs(q);
  });
  const docsArray = await Promise.all(promises);
  const arr: DocumentData[] = [];

  docsArray.forEach((docs) => {
    docs.forEach((doc) => {
      console.log(doc.data());
      arr.push(doc.data());
    });
  });

  return arr;
   
}

export async function getMessagesbyFlatId(flatId: string) {
  try {
    const q = query(collection(db, "messages"), where("flatId", "==", flatId))
    const querySnapshot = await getDocs(q)

    const data:Message[]= []
    querySnapshot.forEach((doc)=>{
      data.push(doc.data() as Message)
    })
    return data as Message[]
  } catch (error) {
    if (error instanceof Error) {
      throw new Error;
    } else {
      console.error(error);
    }
}}


export async function getFlatsbyOwnerId(userId: string) {
  try {
    const q = query(collection(db, "flats"), where("ownerId", "==", userId))
    const querySnapshot = await getDocs(q)

    const data:Flat[]= []
    querySnapshot.forEach((doc)=>{
      data.push(doc.data() as Flat)
    })
    return data as Flat[]
  } catch (error) {
    if (error instanceof Error) {
      throw new Error;
    } else {
      console.error(error);
    }
}}

export async function deleteFlat(flatReference: string) {
  const flatRef = doc(db, "flats", flatReference);
  await deleteDoc(flatRef);
  console.log("deleted");
}