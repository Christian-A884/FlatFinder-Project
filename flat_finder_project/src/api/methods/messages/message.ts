import { Message } from "../../../interface";
import { setDoc, doc, DocumentData, getDocs, collection } from "firebase/firestore";
import { db } from "../../firebase/firebase.config";
import { v4 as uuidv4 } from "uuid";


//function that helps to create fiebase messages collection that stores data about each message that users are sending for a flat.
export async function addNewMessage(message: Message) {
  const uid = uuidv4();
  await setDoc(doc(db, "messages", uid), {
    ...message,
    id: uid,
  });
  console.log("Message sent");
}

// function that helps to get all messages data from firebase messages collection.
export async function showMessages() {
  const arr: DocumentData[] = [];
  const data = await getDocs(collection(db, "messages"));
  data.forEach((doc) => {
    arr.push(doc.data());
  });
  return arr;
}