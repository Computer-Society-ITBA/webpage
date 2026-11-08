import { readFileSync } from "node:fs";
import { initializeApp, applicationDefault } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

const emulator = !!process.env.FIRESTORE_EMULATOR_HOST;
initializeApp(
  emulator
    ? { projectId: "webpage-36e40" }
    : { credential: applicationDefault(), projectId: "webpage-36e40" }
);
const db = getFirestore();

const news = JSON.parse(readFileSync("./src/data/news.json", "utf8"));

for (const { sample, ...item } of news) {
  await db.collection("news").doc(item.slug).set({ ...item, published: true });
  console.log(emulator ? "[emulator]" : "[PRODUCTION]", item.slug);
}
