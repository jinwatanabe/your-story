import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { User } from "../domain/User";

export async function saveUser(user: User) {
  await addDoc(collection(db, "user"), {
    name: user.name,
    age: user.age,
  });
}

export async function getUser() {
  const querySnapshopt = await getDocs(collection(db, "user"));
  const user = querySnapshopt.docs.map(
    (doc) => new User(doc.data().name, doc.data().age)
  );
  return user[0];
}
