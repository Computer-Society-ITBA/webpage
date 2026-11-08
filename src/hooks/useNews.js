import { useEffect, useState } from "react";
import { getNews } from "../data/newsService.js";

export default function useNews(max = 50) {
  const [state, setState] = useState({ news: [], loading: true, error: null });

  useEffect(() => {
    let cancelled = false;
    setState({ news: [], loading: true, error: null });

    getNews(max)
    .then((news) => {
      if (!cancelled) setState({ news, loading: false, error: null });
    })
    .catch((error) => {
      if (!cancelled) setState({ news: [], loading: false, error });
    });

    return () => {
      cancelled = true;
    };
  }, [max]);

  return state;
}