import {
  collection,
  collectionGroup,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { app, db } from "../firestoreconfig";
import { getAuth } from "firebase/auth";
import { useId } from "react";

export const saveData = async (data) => {
  await setDoc(doc(db, "Jewelry", `${Date.now()}`), data, { merge: true });
};
export const orderData = async (data, id) => {
  await setDoc(doc(db, `users`, id, id, `${Date.now()}`), data, {
    merge: true,
  });
  // await setDoc(doc(db, `${id}`, `${Date.now()}`), data, { merge: true });
};
export const usersIds = async (data, id) => {
  await setDoc(doc(db, "uids", `${Date.now()}`), data, { merge: true });
};

export const getDate = async () => {
  const items = await getDocs(
    query(collection(db, "Jewelry"), orderBy("id", "desc"))
  );

  return items.docs.map((doc) => doc.data());
};
export const getUids = async () => {
  const items = await getDocs(
    query(collection(db, "uids"), orderBy("id", "desc"))
  );

  return items.docs.map((doc) => doc.data());
};
export const getUserData = async (userId) => {
  const items = await getDocs(
    query(collection(db, "users", userId, userId), orderBy("id", "desc"))
  );

  return items.docs.map((doc) => doc.data());
};

export const herodata = async () => {
  const items = await getDocs(
    query(collection(db, "Hero"), orderBy("id", "desc"))
  );

  return items.docs.map((doc) => doc.data());
};
export const upD = async (id, data, col) => {
  const item = doc(db, col, id);
  await updateDoc(item, data);
};
export const orderState = async (uid, id, data) => {
  const item = doc(db, "users", uid, uid, `${id}`);
  await updateDoc(item, data);
};
export const remo = async (id) => {
  const delet = doc(db, "Jewelry", id);
  await deleteDoc(delet);
};
export const re = async (uid, id) => {
  const delet = doc(db, "users", uid, uid, `${id}`);
  await deleteDoc(delet);
};

export const subcol = async (userId) => {
  const items = await getDocs(
    query(collection(db, "users", userId, userId), orderBy("id", "desc"))
  );

  return items.docs.map((doc) => doc.data());
};
