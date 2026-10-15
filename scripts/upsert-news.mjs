import { readFileSync } from "node:fs";
import { initializeApp, applicationDefault } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

const path = process.argv[2];
if (!path) {
  console.error("Usage: node scripts/upsert-news.mjs <file.json>");
  process.exit(1);
}

const emulator = !!process.env.FIRESTORE_EMULATOR_HOST;
initializeApp(
  emulator
    ? { projectId: "webpage-36e40" }
    : { credential: applicationDefault(), projectId: "webpage-36e40" }
);
const db = getFirestore();

const items = [].concat(JSON.parse(readFileSync(path, "utf8"))); // one object or an array
for (const item of items) {
  if (typeof item.published !== "boolean") {
    throw new Error(`${item.slug}: "published" must be true or false`);
  }
  
  const required = ["slug", "date", "branch"];
  for (const key of required) {
    if (typeof item[key] !== "string") throw new Error(`${item.slug}: missing or invalid "${key}"`);
  }

  if (!/^\d{4}\/\d{2}\/\d{2}$/.test(item.date)) throw new Error(`${item.slug}: date must be YYYY/MM/DD`);

  for (const lang of ["es", "en"]) {
    if (!item[lang]?.title || !item[lang]?.summary) throw new Error(`${item.slug}: ${lang}.title and ${lang}.summary are required`);
  }
  await db.collection("news").doc(item.slug).set(item);
  console.log(emulator ? "[emulator]" : "[PRODUCTION]", item.slug, "published:", item.published);
}
