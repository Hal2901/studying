import clsx from "clsx";
import React, { memo, useEffect, useMemo } from "react";
import IcDoubleNex from "../assets/icons/IcDoubleNex";
import { useSearchParamHook } from "../hooks/useSearchParam";
import { rootRoute } from "../common";

type IPagination = {
  currentPage: number;
  totalPages: number;
  setCurrentPage: (currentPage: number) => void;
  limit?: number;
  disableEffect?:boolean; // Dinhnkp
};

export const Pagination = memo((props: IPagination) => {
  const { currentPage, setCurrentPage, limit = 5 } = props;
  const totalPages = props.totalPages;
  const disableEffect = props.disableEffect; // Dinhnkp
  const { pathname, searchParams, setQueries } = useSearchParamHook();

  const isAdmin = useMemo(() => {
    return pathname.includes(rootRoute.admin);
  }, [pathname]);

  !disableEffect && useEffect(() => { // Dinhnkp
    const page = searchParams.get("page");
    if (page) {
      setCurrentPage(Number(page));
    } else {
      setCurrentPage(1);
    }
  }, [searchParams]);


  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      setQueries("page", `${currentPage - 1}`);
    }
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      setQueries("page", `${currentPage + 1}`);
    }
  };

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      setQueries("page", `${page}`);
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const halfMaxPages = Math.floor(limit / 2);

    let startPage = currentPage - halfMaxPages;
    let endPage = currentPage + halfMaxPages;

    if (startPage < 1) {
      startPage = 1;
      endPage = limit;
    }

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = totalPages - limit + 1 >= 1 ? totalPages - limit + 1 : 1;
    }

    for (let i = startPage; i <= endPage; i++) {
      const isActive = currentPage === i;
      pageNumbers.push(
        <button key={i} onClick={() => goToPage(i)}>
          <li
            className={clsx(
              "flex text-border rounded-10 bg-white h-10 w-10 border border-border items-center justify-center",
              {
                "border-main !bg-main text-white": isActive,
              }
            )}
          >
            {i}
          </li>
        </button>
      );
    }

    return pageNumbers;
  };

  return (
    <div className=" flex gap-x-2 lg:gap-x-4 mt-8 xl:mt-10 ">
      {currentPage !== 1 && (
        <div className=" w-10 h-10">
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className="rotate-180 w-full h-full flex items-center justify-center rounded-10 bg-white"
          >
            <IcDoubleNex />
          </button>
        </div>
      )}

      <ul className="page-numbers flex flex-row gap-x-[16px]">
        {renderPageNumbers()}
      </ul>
      {currentPage !== totalPages && (
        <div className=" w-10 h-10">
          <button
            onClick={nextPage}
            disabled={currentPage === totalPages}
            className="w-full h-full flex items-center justify-center rounded-10 bg-white"
          >
            <IcDoubleNex />
          </button>
        </div>
      )}
    </div>
  );
});
