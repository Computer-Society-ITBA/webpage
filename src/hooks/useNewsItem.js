import { useEffect, useState } from "react";
import { getNews, getNewsBySlug } from "../data/newsService.js";

export default function useNewsItem(slug) {
  const [state, setState] = useState({ status: "loading", item: null, more: [] });

  useEffect(() => {
    let cancelled = false;
    setState({ status: "loading", item: null, more: [] });

    Promise.all([getNewsBySlug(slug), getNews(3)])
      .then(([item, latest]) => {
        if (cancelled) return;
        if (!item) return setState({ status: "missing", item: null, more: [] });
        const more = latest.filter((entry) => entry.slug !== slug).slice(0, 2);
        setState({ status: "ready", item, more });
      })
      .catch(() => !cancelled && setState({ status: "error", item: null, more: [] }));

    return () => {
      cancelled = true;
    };
  }, [slug]);

  return state;
}