import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { User } from "../../../interface";
import { auth, db } from "../../firebase/firebase.config";
import {
  setDoc,
  doc,
  getDoc,
  getDocs,
  collection,
  DocumentData,
  where,
  query,
  updateDoc,
  deleteDoc
} from "firebase/firestore";
import { signOut } from "firebase/auth";


// function which has as a result user age based on his birthday
export default function calculateUserAge(birthDate: string) {
  const currentDate = new Date();
  const birthday = new Date(birthDate);
  const ageInMilliseconds = currentDate.getTime() - birthday.getTime();
  const userAgeResult = Math.floor(
    ageInMilliseconds / (1000 * 60 * 60 * 24 * 365.25)
  );

  return userAgeResult;
}

export async function registerUser(userData: User) {
  try {
    //* create user in firestore auth
    const userCredentials = await createUserWithEmailAndPassword(
      auth,
      userData.email,
      userData.password
    );
    console.log("User registered", userCredentials);

    //* store user data in firebase using uid-ul generated from  authentication
    await setDoc(doc(db, "users", userCredentials.user.uid), {
      uid: userCredentials.user.uid,
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      birthday: userData.birthday,
      role: "User",
      favourite: [],
      age: calculateUserAge(userData.birthday)
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error;
    } else {
      console.error(error);
    }
  }
}

// function ude for use login
export async function loginUser(userData: User) {
  const userCredentials = await signInWithEmailAndPassword(
    auth,
    userData.email,
    userData.password
  );
  return fetchUser(userCredentials.user.uid);
}


// fucntion which get the user data from firebase "users" collection using an user id as parameter. It also create in local storage an object with the uid of the logged in user and an array of the favorite logged user flats (contains objects of favorite user fltas id)
export async function fetchUser(id: string) {
  try {
    const docRef = doc(db, "users", id);
    const docSnap = await getDoc(docRef);
    if (docSnap) {
      localStorage.setItem("loggedUser", JSON.stringify(docSnap.data()?.uid));
      localStorage.setItem("favFlat",JSON.stringify(docSnap.data().favourite))
      return docSnap.data();
    } else {
      ("User does not exist");
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error;
    } else {
      console.error(error);
    }
  }
}


//this function take the data of logged user from firebase
export async function getUser() {
  const loggedUser = JSON.parse(localStorage.getItem("loggedUser") as string);

  const user = await fetchUser(loggedUser);
  return user;
}

// function for user logout
export async function logoutUser() {
  signOut(auth);
}
//function which create an array of objects of user data from users collection from firebase
export async function getAllUsers() {
  const arr: DocumentData[] = [];
  const data = await getDocs(collection(db, "users"));
  data.forEach((doc) => {
    arr.push(doc.data());
  });
  return arr;
}

// function which provide a spesific user data object from firebase users collection, using an user id as parameter
export async function getUserbyId(id: string) {
  try{
    const q = query(collection(db, "users"), where("uid", "==", id))
    const querySnapshot = await getDocs(q)
    if (!querySnapshot.empty) {
      return querySnapshot.docs[0].data();
  }} catch (error) {
    if (error instanceof Error) {
      throw new Error;
    } else {
      console.error(error);
    }
  }

}

// function wich update all the user data object from firebase users collection, for a specific user
export async function updateUser (updatedUser: User) {
  const userRef = doc(db,"users", updatedUser.uid as string)
  console.log('User update', updatedUser)
  await updateDoc(userRef, {...updatedUser})
}

// function which update the role key value for a specific user
export async function updateUserRole (user:User) {
  const userRef = doc(db,"users", user.uid as string)
  const newRole = user.role === "Admin" ? "User" : "Admin"
  await updateDoc(userRef, {role: newRole})
}

//function which delete all the data for a specific user from firebase users collection
export async function deleteUser(userReference: string) {
  const userRef = doc(db, "users", userReference);
  await deleteDoc(userRef);
  console.log("deleted");
}
