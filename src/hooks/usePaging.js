import { useState } from "react";
import useWindowDimensions from "./useWindowDimensions";

export default function usePaging(elemWidth, elemsLength, rows) {
  // Window width
  const { width } = useWindowDimensions();
  // Number of visible columns of elems
  let visiblePages = Math.floor(width / elemWidth);
  // Total number of card columns
  let totalPages = Math.ceil(elemsLength / rows);
  // Limit to pages
  const pageLimit = totalPages - visiblePages;
  // Slider Page
  const [page, setPage] = useState(0);
  // Scrollable left limit
  const limitLeft = -1 * pageLimit * elemWidth;

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
