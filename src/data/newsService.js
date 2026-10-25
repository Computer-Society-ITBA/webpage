import { collection, query, where, orderBy, limit, getDocs } from "firebase/firestore";
import { db } from "../firebase.js";

const col = collection(db, "news");

export async function getNews(max = 50) {
  const q = query(
    col,
    where("published", "==", true),
    orderBy("date", "desc"),
    limit(max)
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function getNewsBySlug(slug) {
  const q = query(col, where("slug", "==", slug), where("published", "==", true), limit(1));
  const snap = await getDocs(q);
  return snap.empty ? null : { id: snap.docs[0].id, ...snap.docs[0].data() };
}