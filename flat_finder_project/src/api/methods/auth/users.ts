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
    //* cream userul in authentication
    const userCredentials = await createUserWithEmailAndPassword(
      auth,
      userData.email,
      userData.password
    );
    console.log("User registered", userCredentials);

    //* stocam in firestore datele utilizatorului folosindu-ne de uid-ul obtinut din authentication
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
    console.log("User registered");
  } catch (error: unknown) {
    throw new Error(error)
  }
}

export async function loginUser(userData: User) {
  const userCredentials = await signInWithEmailAndPassword(
    auth,
    userData.email,
    userData.password
  );
  return fetchUser(userCredentials.user.uid);

  //   const docRef = doc(db, "users", userCredentials.user.uid);
  //   const docSnap = await getDoc(docRef);
  //   if (docSnap) {
  //     console.log("User data", docSnap.data());

  //     localStorage.setItem("loggedUser", JSON.stringify(docSnap.data().uid as string))
  //     return docSnap.data()
  //   } else {
  //     ("User does not exist");
  //   }
  // } catch (error) {
  //   console.error("Error auth user", error);
  // }
}

export async function fetchUser(id: string) {
  try {
    const docRef = doc(db, "users", id);
    const docSnap = await getDoc(docRef);
    if (docSnap) {
      console.log("User data", docSnap.data());

      localStorage.setItem("loggedUser", JSON.stringify(docSnap.data()?.uid));
      localStorage.setItem("favFlat",JSON.stringify(docSnap.data().favourite))
      return docSnap.data();
    } else {
      ("User does not exist");
    }
  } catch (error) {
    throw new Error(error as string);
  }
}

export async function getUser() {
  const loggedUser = JSON.parse(localStorage.getItem("loggedUser") as string);

  const user = await fetchUser(loggedUser);
  return user;
}

export async function logoutUser() {
  signOut(auth);
}

export async function getAllUsers() {
  const arr: DocumentData[] = [];
  const data = await getDocs(collection(db, "users"));
  data.forEach((doc) => {
    arr.push(doc.data());
    console.log(doc.data())
  });
  return arr;
}

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

export async function updateUser (updatedUser: User) {
  const userRef = doc(db,"users", updatedUser.uid as string)
  console.log('User update', updatedUser)
  await updateDoc(userRef, {...updatedUser})
}

export async function updateUserRole (user:User) {
  const userRef = doc(db,"users", user.uid as string)
  const newRole = user.role === "Admin" ? "User" : "Admin"
  await updateDoc(userRef, {role: newRole})
}

export async function deleteUser(userReference: string) {
  const userRef = doc(db, "users", userReference);
  await deleteDoc(userRef);
  console.log("deleted");
}