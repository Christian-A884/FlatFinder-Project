import { Message } from "../../../interface";
import { setDoc, doc, DocumentData, getDocs, collection } from "firebase/firestore";
import { db } from "../../firebase/firebase.config";
import { v4 as uuidv4 } from "uuid";

export async function addNewMessage(message: Message) {
  const uid = uuidv4();
  await setDoc(doc(db, "messages", uid), {
    ...message,
    id: uid,
  });
  console.log("Message sent");
}

export async function showMessages() {
  const arr: DocumentData[] = [];
  const data = await getDocs(collection(db, "messages"));
  data.forEach((doc) => {
    arr.push(doc.data());
  });
  return arr;
}