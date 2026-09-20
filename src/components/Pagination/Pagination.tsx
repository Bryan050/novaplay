import { ReactNode } from "react";
import styles from "./pagination.module.css";
import { useLocation, useNavigate } from "react-router-dom";
type PaginationProps = {
  className?: string;
  style?: Record<string, any>;
  breakLabel?: ReactNode;
  nextLabel?: ReactNode;
  previousLabel?: ReactNode;
  onPageChange: Function;
  pageCount: number;
  pageRangeDisplayed?: number;
  selectedPage: number;
  setSelectedPage: Function;
};
const Pagination: React.FC<PaginationProps> = ({
  className = "",
  style,
  nextLabel = ">",
  previousLabel = "<",
  onPageChange,
  pageCount,
  pageRangeDisplayed = 10,
  selectedPage = 1,
  setSelectedPage,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const handlePageClick = (page: number) => {
    setSelectedPage(page);
    onPageChange(page);
    navigate(getTargetPathname(page));
    window.scrollTo(0,0);
  };
  const handlePreviousClick = () => {
    setSelectedPage((prevValue: number) => {
      const newValue = prevValue - 1;
      onPageChange(newValue);
      navigate(getTargetPathname(newValue));
      window.scrollTo(0,0);
      return newValue;
    });
  };
  const handleNextClick = () => {
    setSelectedPage((prevValue: number) => {
      const newValue = prevValue + 1;
      onPageChange(newValue);
      navigate(getTargetPathname(newValue));
      window.scrollTo(0,0);
      return newValue;
    }); 
  };
  const getTargetPathname = (target: number) => {
    const cleanPath = location.pathname.replace(/\/\d+$/, "");
    const query = location.search;
    return `${cleanPath}${cleanPath.length === 1 ? "": "/"}${target}${query}`
  }
  const listPages = () => {
    const pages = [];
    let displacement = Math.floor(pageRangeDisplayed / 2);
    let evenNumber = pageRangeDisplayed % 2 === 0;
    const start = Math.max(
      1,
      Math.min(
        selectedPage - (evenNumber ? displacement - 1 : displacement),
        pageCount - (pageRangeDisplayed - 1)
      )
    );
    const end = Math.min(
      pageCount,
      Math.max(pageRangeDisplayed, selectedPage + displacement)
    );

    for (let i = start; i <= end; i++) {
      pages.push(
        <li key={i}>
          <button
            className={`${styles.page} ${
              selectedPage === i ? styles["selected"] : ""
            }`}
            onClick={() => handlePageClick(i)}
          >
            {i}
          </button>
        </li>
      );
    }
    if (start != 1) {
      console.log("PAGES", pages);
      pages.unshift(
        <li key={parseInt(pages[pages.length - 1].key || "200") + 1} className={`${styles["break-label"]} ${styles.page}`}>
          <span>···</span>
        </li>
      );
      pages.unshift(
        <li key={parseInt(pages[pages.length - 1].key || "200") + 1}>
          <button className={styles.page} onClick={() => handlePageClick(1)}>
            {1}
          </button>
        </li>
      );
    }
    if (start < (pageCount - pageRangeDisplayed) || end != pageCount) {
      pages.push(
        <li key={parseInt(pages[pages.length - 1].key || "200") + 3} className={`${styles["break-label"]} ${styles.page}`}>
          <span>···</span>
        </li>
      );
      pages.push(
        <li key={parseInt(pages[pages.length - 1].key || "201") + 3}>
          <button
            className={styles.page}
            onClick={() => handlePageClick(pageCount)}
          >
            {pageCount}
          </button>
        </li>
      );
    }
    return pages;
  };
  return (
    <ul className={`${styles["pagination"]} ${className}`} style={style}>
      {selectedPage != 1 && <li>
        <button
          className={`${styles.page}`}
          onClick={handlePreviousClick}
        >
          {previousLabel}
        </button>
      </li>}
      {listPages()}
      {selectedPage != pageCount  && <li>
        <button
          className={`${styles.page}`}
          onClick={handleNextClick}
        >
          {nextLabel}
        </button>
      </li>}
    </ul>
  );
};

export default Pagination;
