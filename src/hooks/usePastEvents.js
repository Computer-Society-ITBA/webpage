import { useEffect, useState } from "react";
import { collection, getDocs, limit, orderBy, query, where } from "firebase/firestore";
import i18n from "../i18n";
import { db } from "../firebase";

// Fotos locales: las de Firestore (img.src) apuntan a archivos que no están subidos a Storage,
// así que hoy no se usan. Un evento sin foto acá se muestra sin miniatura.
import hackitba2026 from "../images/past_events_images/hackitba-2026-grupo.jpg";
import quantumJam2025 from "../images/news_images/quantum-jam-2025.jpg";

const localPhotos = {
  HACKITBA_2026: hackitba2026,
  QUANTUM_JAM_2025: quantumJam2025,
};

const branches = ["club", "hackit", "quantum", "gamejam"];

// Sin campo branch en el documento, la rama sale del título
function inferBranch(title = "") {
  if (/hack\s*-?\s*it/i.test(title)) return "hackit";
  if (/quantum/i.test(title)) return "quantum";
  if (/game\s*jam/i.test(title)) return "gamejam";
  return "club";
}

// Los últimos `count` eventos con fecha de hoy o anterior; null mientras carga
export default function usePastEvents(count) {
  const [events, setEvents] = useState(null);

  useEffect(() => {
    let language = i18n.language.split("-")[0];
    if (language !== "es") language = "en";

    const now = new Date();
    const today = [
      now.getFullYear(),
      String(now.getMonth() + 1).padStart(2, "0"),
      String(now.getDate()).padStart(2, "0"),
    ].join("/");

    const pastEventsQuery = query(
      collection(db, "past_events"),
      where("date", "<=", today),
      orderBy("date", "desc"),
      limit(count)
    );

    getDocs(pastEventsQuery)
      .then((result) => {
        setEvents(
          result.docs.map((doc) => {
            const data = doc.data();
            const text = data[language] || {};
            return {
              id: doc.id,
              date: data.date,
              attendants: data.attendants,
              link: data.link,
              title: text.title,
              description: text.description,
              branch: branches.includes(data.branch) ? data.branch : inferBranch(text.title),
              photo: localPhotos[doc.id],
            };
          })
        );
      })
      .catch(() => setEvents([]));
  }, [count]);

  return events;
}
