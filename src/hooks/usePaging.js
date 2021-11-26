import { useState, useEffect } from "react";
import useWindowDimensions from "./useWindowDimensions";

export default function usePaging(elemWidth, elems, rows) {

  const { width } = useWindowDimensions();
  const [page, setPage] = useState(0);
  const [pageLimit, setPageLimit] = useState(0);
  const [limitLeft, setLimitLeft] = useState(0);

  useEffect(() => {
    // Number of visible columns of elems
    const visibAux = Math.floor(width / elemWidth);
    // Total number of card columns
    const totalAux = Math.ceil(elems.length / rows);
    // Limit to pages
    const limitAux = totalAux - visibAux;
    setPageLimit(limitAux);
    // Slider Page
    setPage(0);
    // Scrollable left limit
    setLimitLeft(-1 * limitAux * elemWidth);
  }, [elems, elemWidth, rows, width]);

  const pageLeft = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };
  const pageRight = () => {
    if (page < pageLimit) {
      setPage(page + 1);
    }
  };

  return [page, pageLeft, pageRight, pageLimit, limitLeft];
}
