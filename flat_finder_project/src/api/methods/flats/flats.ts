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


//function that create new documents in firebase flats collection, documents that contains flats data. The document name is the same with the flat id.
export async function addNewFlat(flat: Flat) {
  const loggedUser = JSON.parse(localStorage.getItem("loggedUser") as string);
  const user = await fetchUser(loggedUser);
 

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
      flatImage: flat.flatImage
    });
  } else {
    console.error("No user is logged in");
  }
}

// function which update a document from firebase flats collection, identified using a flat id as parameter
export async function updateFlat(updatedFlat: Flat) {
  const flatRef = doc(db, "flats", updatedFlat.id as string);
  await updateDoc(flatRef, { ...updatedFlat });
}

// function that get all the flats from the firebase flats collection
export async function showFlats() {
  const arr: DocumentData[] = [];
  const data = await getDocs(collection(db, "flats"));
  data.forEach((doc) => {
    arr.push(doc.data());
  });
  return arr;
}


// function that get all the flats data form firebase flats collection which fullfills the condition from syntax.
export async function getWantedFlat(flats: FavFlat[]) {
  const promises = flats.map((flat) => {
    const q = query(collection(db, "flats"), where("id", "==", flat.flatId));
    return getDocs(q);
  });
  const docsArray = await Promise.all(promises);
  const arr: DocumentData[] = [];

  docsArray.forEach((docs) => {
    docs.forEach((doc) => {
      arr.push(doc.data());
    });
  });

  return arr;
}

// function that create, inside an user document from firebase users collection, a new field, favorite, as an array of strings which contains flats id from all the flats that a specific user add to favorite.This function also creates a localstorage array of objects with the same data as favorite firebase field.
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

// function that remove from the data form favorite firebase field from users collection and also from local storage array, favflat

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

//function that helps to provide data from a specific flat identified by flat id
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

//function that help to provide all the flats from flats collection wich IDs are similar with flatIds from favFlat local storage array of objects
export async function getFlatsbyFlatId(flats: Flat[]) {
  const promises = flats.map((flat) => {
    const q = query(collection(db, "flats"), where("id", "==", flat.flatId));
    return getDocs(q);
  });
  const docsArray = await Promise.all(promises);
  const arr: DocumentData[] = [];

  docsArray.forEach((docs) => {
    docs.forEach((doc) => {
      arr.push(doc.data());
    });
  });

  return arr;
   
}

// function that help to get all the messages, stored in firebase messages collection, sent by users for a specific flat.
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

// function that help to get all the flats that was added by a user
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

// function that help to delete a specific flat form firebase flats collection
export async function deleteFlat(flatReference: string) {
  const flatRef = doc(db, "flats", flatReference);
  await deleteDoc(flatRef);
  
}