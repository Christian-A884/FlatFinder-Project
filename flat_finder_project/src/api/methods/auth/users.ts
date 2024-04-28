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
} from "firebase/firestore";
import { signOut } from "firebase/auth";

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
      role: "regular",
    });
    console.log("User registered");
  } catch (error) {
    console.error("User registering error", error);
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
  });
  return arr;
}
