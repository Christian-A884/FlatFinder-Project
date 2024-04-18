import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { User } from "../../../interface";
import { auth, db } from "../../firebase/firebase.config";
import { setDoc, doc } from "firebase/firestore";

export async function registerUser(userData: User) {
  try{
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
console.log("User registered")
  } catch(error) {
    throw new Error(error as string);
  }
 
}

export async function loginUser(userData:User){
  const userCredentials = await signInWithEmailAndPassword(auth, userData.email, userData.password)
  console.log('User authetication', userCredentials.user)
}
